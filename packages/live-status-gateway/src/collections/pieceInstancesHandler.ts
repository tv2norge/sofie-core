import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection, CollectionObserver } from '../wsHandler'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { PieceInstance } from '@sofie-automation/corelib/dist/dataModel/PieceInstance'
import { unprotectString } from '@sofie-automation/corelib/dist/protectedString'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import areElementsShallowEqual from '@sofie-automation/shared-lib/dist/lib/isShallowEqual'
import throttleToNextTick from '@sofie-automation/shared-lib/dist/lib/throttleToNextTick'
import _ = require('underscore')
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { PartInstanceId, PieceInstanceId } from '@sofie-automation/corelib/dist/dataModel/Ids'

export interface SelectedPieceInstances {
	// Pieces reported by the Playout Gateway as active
	active: PieceInstance[]

	// Pieces present in the current part instance
	currentPartInstance: PieceInstance[]

	// Pieces present in the current part instance
	nextPartInstance: PieceInstance[]
}

export class PieceInstancesHandler
	extends CollectionBase<SelectedPieceInstances, CorelibPubSub.pieceInstances, CollectionName.PieceInstances>
	implements Collection<SelectedPieceInstances>, CollectionObserver<DBRundownPlaylist>
{
	public observerName: string
	private _currentPlaylist: DBRundownPlaylist | undefined
	private _partInstanceIds: PartInstanceId[] = []
	private _activationId: string | undefined
	private _subscriptionPending = false

	private _throttledUpdateAndNotify = throttleToNextTick(() => {
		this.updateCollectionData()
		this.notify(this._collectionData).catch(this._logger.error)
	})

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(
			PieceInstancesHandler.name,
			CollectionName.PieceInstances,
			CorelibPubSub.pieceInstances,
			logger,
			coreHandler
		)
		this.observerName = this._name
		this._collectionData = {
			active: [],
			currentPartInstance: [],
			nextPartInstance: [],
		}
	}

	async changed(id: PieceInstanceId, changeType: string): Promise<void> {
		this._logger.info(`${this._name} ${changeType} ${id}`)
		if (!this._collectionName || this._subscriptionPending) return
		this._throttledUpdateAndNotify()
	}

	private updateCollectionData(): boolean {
		if (!this._collectionName || !this._collectionData) return false
		const collection = this._core.getCollection(this._collectionName)
		if (!collection) throw new Error(`collection '${this._collectionName}' not found!`)
		const active = this._currentPlaylist?.currentPartInfo?.partInstanceId
			? collection.find((pieceInstance: PieceInstance) => this.isPieceInstanceActive(pieceInstance))
			: []
		const inCurrentPartInstance = this._currentPlaylist?.currentPartInfo?.partInstanceId
			? collection.find({ partInstanceId: this._currentPlaylist.currentPartInfo.partInstanceId })
			: []
		const inNextPartInstance = this._currentPlaylist?.nextPartInfo?.partInstanceId
			? collection.find({ partInstanceId: this._currentPlaylist.nextPartInfo.partInstanceId })
			: []

		let hasAnythingChanged = false
		if (!areElementsShallowEqual(this._collectionData.active, active)) {
			this._collectionData.active = active
			hasAnythingChanged = true
		}
		if (!areElementsShallowEqual(this._collectionData.currentPartInstance, inCurrentPartInstance)) {
			this._collectionData.currentPartInstance = inCurrentPartInstance
			hasAnythingChanged = true
		}
		if (!areElementsShallowEqual(this._collectionData.nextPartInstance, inNextPartInstance)) {
			this._collectionData.nextPartInstance = inNextPartInstance
			hasAnythingChanged = true
		}
		return hasAnythingChanged
	}

	private clearCollectionData() {
		if (!this._collectionName || !this._collectionData) return
		this._collectionData.active = []
		this._collectionData.currentPartInstance = []
		this._collectionData.nextPartInstance = []
	}

	async update(source: string, data: DBRundownPlaylist | undefined): Promise<void> {
		const prevPartInstanceIds = this._partInstanceIds
		const prevActivationId = this._activationId

		this._logger.info(
			`${this._name} received playlist update ${data?._id}, active ${!!data?.activationId} from ${source}`
		)
		this._currentPlaylist = data
		if (!this._collectionName) return

		this._partInstanceIds = this._currentPlaylist
			? _.compact([
					this._currentPlaylist.previousPartInfo?.partInstanceId,
					this._currentPlaylist.nextPartInfo?.partInstanceId,
					this._currentPlaylist.currentPartInfo?.partInstanceId,
			  ])
			: []
		this._activationId = unprotectString(this._currentPlaylist?.activationId)
		if (this._currentPlaylist && this._partInstanceIds.length && this._activationId) {
			const sameSubscription =
				areElementsShallowEqual(this._partInstanceIds, prevPartInstanceIds) &&
				prevActivationId === this._activationId
			if (!sameSubscription) {
				await new Promise(process.nextTick.bind(this))
				if (!this._collectionName) return
				if (!this._publicationName) return
				if (!this._currentPlaylist) return
				if (this._subscriptionId) this._coreHandler.unsubscribe(this._subscriptionId)
				this._subscriptionPending = true
				this._subscriptionId = await this._coreHandler.setupSubscription(
					this._publicationName,
					this._currentPlaylist.rundownIdsInOrder,
					this._partInstanceIds,
					{}
				)
				this._subscriptionPending = false
				this._dbObserver = this._coreHandler.setupObserver(this._collectionName)
				this._dbObserver.added = (id) => {
					void this.changed(id, 'added').catch(this._logger.error)
				}
				this._dbObserver.changed = (id) => {
					void this.changed(id, 'changed').catch(this._logger.error)
				}
				this._dbObserver.removed = (id) => {
					void this.changed(id, 'removed').catch(this._logger.error)
				}

				const hasAnythingChanged = this.updateCollectionData()
				if (hasAnythingChanged) {
					await this.notify(this._collectionData)
				}
			} else if (this._subscriptionId) {
				// nothing relevant has changed
			} else {
				this.clearCollectionData()
				await this.notify(this._collectionData)
			}
		} else {
			this.clearCollectionData()
			await this.notify(this._collectionData)
		}
	}

	private isPieceInstanceActive(pieceInstance: PieceInstance) {
		return (
			pieceInstance.reportedStoppedPlayback == null &&
			(pieceInstance.partInstanceId === this._currentPlaylist?.previousPartInfo?.partInstanceId || // a piece from previous part instance may be active during transition
				pieceInstance.partInstanceId === this._currentPlaylist?.currentPartInfo?.partInstanceId) &&
			(pieceInstance.reportedStartedPlayback != null || // has been reported to have started by the Playout Gateway
				(pieceInstance.partInstanceId === this._currentPlaylist?.currentPartInfo?.partInstanceId &&
					pieceInstance.piece.enable.start === 0) || // this is to speed things up immediately after a part instance is taken when not yet reported by the Playout Gateway
				pieceInstance.infinite?.fromPreviousPart) // infinites from previous part also are on air from the start of the current part
		)
	}
}
