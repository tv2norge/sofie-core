import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection, PickArr } from '../wsHandler'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { PieceInstance } from '@sofie-automation/corelib/dist/dataModel/PieceInstance'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import areElementsShallowEqual from '@sofie-automation/shared-lib/dist/lib/isShallowEqual'
import _ = require('underscore')
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { PartInstanceId } from '@sofie-automation/corelib/dist/dataModel/Ids'
import {
	PieceInstanceWithTimings,
	processAndPrunePieceInstanceTimings,
} from '@sofie-automation/corelib/dist/playout/processAndPrune'
import { ShowStyleBaseExt } from './showStyleBaseHandler'
import { SourceLayers } from '@sofie-automation/corelib/dist/dataModel/ShowStyleBase'
import { SelectedPartInstances } from './partInstancesHandler'
import { DBPartInstance } from '@sofie-automation/corelib/dist/dataModel/PartInstance'
import { arePropertiesDeepEqual } from '../helpers/equality'
import { CollectionHandlers } from '../liveStatusServer'

const PLAYLIST_KEYS = [
	'_id',
	'activationId',
	'currentPartInfo',
	'nextPartInfo',
	'previousPartInfo',
	'rundownIdsInOrder',
] as const
type Playlist = PickArr<DBRundownPlaylist, typeof PLAYLIST_KEYS>

const PART_INSTANCES_KEYS = ['previous', 'current'] as const
type PartInstances = PickArr<SelectedPartInstances, typeof PART_INSTANCES_KEYS>

const SHOW_STYLE_BASE_KEYS = ['sourceLayers'] as const
type ShowStyle = PickArr<ShowStyleBaseExt, typeof SHOW_STYLE_BASE_KEYS>

export type PieceInstanceMin = Omit<PieceInstance, 'reportedStartedPlayback' | 'reportedStoppedPlayback'>

export interface SelectedPieceInstances {
	// Pieces reported by the Playout Gateway as active
	active: PieceInstanceMin[]

	// Pieces present in the current part instance
	currentPartInstance: PieceInstanceMin[]

	// Pieces present in the next part instance
	nextPartInstance: PieceInstanceMin[]
}

export class PieceInstancesHandler
	extends CollectionBase<SelectedPieceInstances, CorelibPubSub.pieceInstances, CollectionName.PieceInstances>
	implements Collection<SelectedPieceInstances>
{
	public observerName: string
	private _currentPlaylist: Playlist | undefined
	private _partInstanceIds: PartInstanceId[] = []
	private _sourceLayers: SourceLayers = {}
	private _partInstances: PartInstances | undefined

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(CollectionName.PieceInstances, CorelibPubSub.pieceInstances, logger, coreHandler)
		this.observerName = this._name
		this._collectionData = {
			active: [],
			currentPartInstance: [],
			nextPartInstance: [],
		}
	}

	init(handlers: CollectionHandlers): void {
		super.init(handlers)

		handlers.playlistHandler.subscribe(this.onPlaylistUpdate, PLAYLIST_KEYS)
		handlers.partInstancesHandler.subscribe(this.onPartInstancesUpdate, PART_INSTANCES_KEYS)
		handlers.showStyleBaseHandler.subscribe(this.onShowStyleBaseUpdate, SHOW_STYLE_BASE_KEYS)
	}

	changed(): void {
		this.updateAndNotify()
	}

	private processAndPrunePieceInstanceTimings(
		partInstance: DBPartInstance | undefined,
		pieceInstances: PieceInstance[]
	): PieceInstanceWithTimings[] {
		// Approximate when 'now' is in the PartInstance, so that any adlibbed Pieces will be timed roughly correctly
		const partStarted = partInstance?.timings?.plannedStartedPlayback
		const nowInPart = partStarted === undefined ? 0 : Date.now() - partStarted

		return processAndPrunePieceInstanceTimings(this._sourceLayers, pieceInstances, nowInPart, false, false)
	}

	private updateCollectionData(): boolean {
		if (!this._collectionData) return false
		const collection = this.getCollectionOrFail()

		const inPreviousPartInstance = this._currentPlaylist?.previousPartInfo?.partInstanceId
			? this.processAndPrunePieceInstanceTimings(
					this._partInstances?.previous,
					collection.find({ partInstanceId: this._currentPlaylist.previousPartInfo.partInstanceId })
			  )
			: []
		const inCurrentPartInstance = this._currentPlaylist?.currentPartInfo?.partInstanceId
			? this.processAndPrunePieceInstanceTimings(
					this._partInstances?.current,
					collection.find({ partInstanceId: this._currentPlaylist.currentPartInfo.partInstanceId })
			  )
			: []
		const inNextPartInstance = this._currentPlaylist?.nextPartInfo?.partInstanceId
			? this.processAndPrunePieceInstanceTimings(
					undefined,
					collection.find({ partInstanceId: this._currentPlaylist.nextPartInfo.partInstanceId })
			  )
			: []

		const active = [...inPreviousPartInstance, ...inCurrentPartInstance].filter((pieceInstance) =>
			this.isPieceInstanceActive(pieceInstance)
		)

		let hasAnythingChanged = false
		if (!areElementsShallowEqual(this._collectionData.active, active)) {
			this._collectionData.active = active
			hasAnythingChanged = true
		}
		if (
			this._collectionData.currentPartInstance.length !== inCurrentPartInstance.length ||
			this._collectionData.currentPartInstance.some((pieceInstance, index) => {
				return !arePropertiesDeepEqual<PieceInstanceWithTimings>(inCurrentPartInstance[index], pieceInstance, [
					'plannedStartedPlayback',
					'plannedStoppedPlayback',
					'reportedStartedPlayback',
					'reportedStoppedPlayback',
					'resolvedEndCap',
					'priority',
				])
			})
		) {
			this._logger.debug('xcur', { prev: this._collectionData.currentPartInstance, cur: inCurrentPartInstance })
			this._collectionData.currentPartInstance = inCurrentPartInstance
			hasAnythingChanged = true
		}
		if (
			this._collectionData.nextPartInstance.length !== inNextPartInstance.length ||
			this._collectionData.nextPartInstance.some((pieceInstance, index) => {
				return !arePropertiesDeepEqual<PieceInstanceWithTimings>(inNextPartInstance[index], pieceInstance, [
					'plannedStartedPlayback',
					'plannedStoppedPlayback',
					'reportedStartedPlayback',
					'reportedStoppedPlayback',
					'resolvedEndCap',
					'priority',
				])
			})
		) {
			this._collectionData.nextPartInstance = inNextPartInstance
			hasAnythingChanged = true

			this._logger.debug('xnext')
		}
		return hasAnythingChanged
	}

	private clearCollectionData() {
		if (!this._collectionData) return
		this._collectionData.active = []
		this._collectionData.currentPartInstance = []
		this._collectionData.nextPartInstance = []
	}

	private onShowStyleBaseUpdate = (showStyleBase: ShowStyle | undefined): void => {
		this.logUpdateReceived('showStyleBase')
		this._sourceLayers = showStyleBase?.sourceLayers ?? {}
		this.updateAndNotify()
	}

	private onPartInstancesUpdate = (partInstances: PartInstances | undefined): void => {
		this.logUpdateReceived('partInstances')
		this._partInstances = partInstances
		this.updateAndNotify()
	}

	private onPlaylistUpdate = (playlist: Playlist | undefined): void => {
		this.logUpdateReceived('playlist', `rundownPlaylistId ${playlist?._id}, active ${!!playlist?.activationId}`)

		const prevPartInstanceIds = this._partInstanceIds
		const prevPlaylist = this._currentPlaylist

		this._currentPlaylist = playlist

		this._partInstanceIds = this._currentPlaylist
			? _.compact(
					[
						this._currentPlaylist.previousPartInfo?.partInstanceId,
						this._currentPlaylist.nextPartInfo?.partInstanceId,
						this._currentPlaylist.currentPartInfo?.partInstanceId,
					].sort()
			  )
			: []
		if (this._currentPlaylist && this._partInstanceIds.length && this._currentPlaylist?.activationId) {
			const sameSubscription =
				areElementsShallowEqual(this._partInstanceIds, prevPartInstanceIds) &&
				areElementsShallowEqual(
					prevPlaylist?.rundownIdsInOrder ?? [],
					this._currentPlaylist.rundownIdsInOrder
				) &&
				prevPlaylist?.activationId === this._currentPlaylist?.activationId
			if (!sameSubscription) {
				this.setupSubscription(
					{
						rundownId: { $in: this._currentPlaylist.rundownIdsInOrder },
						partInstanceId: { $in: this._partInstanceIds },
					},
					true
				)
				// this._subscriptionId = await this._coreHandler.setupSubscription(
				// 	this._publicationName,
				// 	this._currentPlaylist.rundownIdsInOrder,
				// 	this._partInstanceIds,
				// 	{}
				// )
			} else if (this._subscriptionId) {
				this.updateAndNotify()
			} else {
				this.clearAndNotify()
			}
		} else {
			this.clearAndNotify()
		}
	}

	private clearAndNotify() {
		this.clearCollectionData()
		this.notify(this._collectionData)
	}

	private updateAndNotify() {
		const hasAnythingChanged = this.updateCollectionData()
		if (hasAnythingChanged) {
			this.notify(this._collectionData)
		}
	}

	private isPieceInstanceActive(pieceInstance: PieceInstance) {
		return (
			pieceInstance.reportedStoppedPlayback == null &&
			pieceInstance.piece.virtual !== true &&
			pieceInstance.disabled !== true &&
			(pieceInstance.partInstanceId === this._currentPlaylist?.previousPartInfo?.partInstanceId || // a piece from previous part instance may be active during transition
				pieceInstance.partInstanceId === this._currentPlaylist?.currentPartInfo?.partInstanceId) &&
			(pieceInstance.reportedStartedPlayback != null || // has been reported to have started by the Playout Gateway
				pieceInstance.plannedStartedPlayback != null || // a time to start playing has been set by Core
				(pieceInstance.partInstanceId === this._currentPlaylist?.currentPartInfo?.partInstanceId &&
					pieceInstance.piece.enable.start === 0) || // this is to speed things up immediately after a part instance is taken when not yet reported by the Playout Gateway
				pieceInstance.infinite?.fromPreviousPart) // infinites from previous part also are on air from the start of the current part
		)
	}
}
