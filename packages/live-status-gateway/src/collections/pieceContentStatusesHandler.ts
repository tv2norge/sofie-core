import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection, CollectionObserver } from '../wsHandler'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import {
	UIPieceContentStatus,
	UIPieceContentStatusId,
} from '@sofie-automation/corelib/dist/dataModel/PieceContentStatus'
import throttleToNextTick from '@sofie-automation/shared-lib/dist/lib/throttleToNextTick'
import { RundownPlaylistId } from '@sofie-automation/corelib/dist/dataModel/Ids'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'

export class PieceContentStatusesHandler
	extends CollectionBase<UIPieceContentStatus[], CorelibPubSub.uiPieceContentStatuses, 'uiPieceContentStatuses'>
	implements Collection<UIPieceContentStatus[]>, CollectionObserver<DBRundownPlaylist>
{
	public observerName: string
	private _currentPlaylistId: RundownPlaylistId | undefined
	private _subscriptionPending = false

	private _throttledUpdateAndNotify = throttleToNextTick(() => {
		this.updateAndNotify().catch(this._logger.error)
	})

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(
			PieceContentStatusesHandler.name,
			'uiPieceContentStatuses',
			CorelibPubSub.uiPieceContentStatuses,
			logger,
			coreHandler
		)
		this.observerName = this._name
	}

	async changed(id: UIPieceContentStatusId, changeType: string): Promise<void> {
		this.logDocumentChange(id, changeType)
		if (!this._collectionName || this._subscriptionPending) return

		this._throttledUpdateAndNotify()
	}

	private updateCollectionData() {
		if (!this._collectionName) return
		const collection = this._core.getCollection<UIPieceContentStatus>(this._collectionName)
		if (!collection) throw new Error(`collection '${this._collectionName}' not found!`)
		this._collectionData = collection.find({})
	}

	private clearCollectionData() {
		this._collectionData = []
	}

	async update(source: string, data: DBRundownPlaylist | undefined): Promise<void> {
		this.logUpdateReceived(
			'playlist',
			source,
			`rundownPlaylistId ${data?._id}, active ${data?.activationId ? true : false}`
		)
		const prevPlaylistId = this._currentPlaylistId
		this._currentPlaylistId = data?._id
		if (!this._collectionName) return

		if (this._currentPlaylistId) {
			if (prevPlaylistId !== this._currentPlaylistId) {
				await new Promise(process.nextTick.bind(this))
				if (!this._collectionName) return
				if (!this._publicationName) return
				if (this._subscriptionId) this._coreHandler.unsubscribe(this._subscriptionId)
				this._subscriptionPending = true
				this._subscriptionId = await this._coreHandler.setupSubscription(
					this._publicationName,
					this._currentPlaylistId
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

				await this.updateAndNotify()
			}
		} else {
			await this.clearAndNotify()
		}
	}

	private async clearAndNotify() {
		this.clearCollectionData()
		await this.notify(this._collectionData)
	}

	private async updateAndNotify() {
		this.updateCollectionData()
		await this.notify(this._collectionData)
	}
}
