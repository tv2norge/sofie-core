import { Logger } from 'winston'
import { WebSocket } from 'ws'
import { unprotectString } from '@sofie-automation/shared-lib/dist/lib/protectedString'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { DBPartInstance } from '@sofie-automation/corelib/dist/dataModel/PartInstance'
import { literal } from '@sofie-automation/shared-lib/dist/lib/lib'
import { WebSocketTopicBase, WebSocketTopic, PickArr } from '../wsHandler'
import { SelectedPartInstances } from '../collections/partInstancesHandler'
import { ShowStyleBaseExt } from '../collections/showStyleBaseHandler'
import { CurrentSegmentTiming, calculateCurrentSegmentTiming } from './helpers/segmentTiming'
import { DBPart } from '@sofie-automation/corelib/dist/dataModel/Part'
import _ = require('underscore')
import { PartTiming, calculateCurrentPartTiming } from './helpers/partTiming'
import { CurrentSegmentPart, getCurrentSegmentParts } from './helpers/segmentParts'
import { SelectedPieceInstances, PieceInstanceMin } from '../collections/pieceInstancesHandler'
import { PieceStatus, toPieceStatus } from './helpers/pieceStatus'
import { CollectionHandlers } from '../liveStatusServer'
import areElementsShallowEqual from '@sofie-automation/shared-lib/dist/lib/isShallowEqual'

const THROTTLE_PERIOD_MS = 100

interface PartStatus {
	id: string
	segmentId: string
	name: string
	autoNext: boolean | undefined
	pieces: PieceStatus[]
	publicData: unknown
}

interface CurrentPartStatus extends PartStatus {
	timing: PartTiming
}

interface CurrentSegmentStatus {
	id: string
	timing: CurrentSegmentTiming
	parts: CurrentSegmentPart[]
}

export interface ActivePlaylistStatus {
	event: string
	id: string | null
	name: string
	rundownIds: string[]
	currentPart: CurrentPartStatus | null
	currentSegment: CurrentSegmentStatus | null
	nextPart: PartStatus | null
	publicData: unknown
}

const PLAYLIST_KEYS = [
	'_id',
	'activationId',
	'name',
	'rundownIdsInOrder',
	'publicData',
	'currentPartInfo',
	'nextPartInfo',
] as const
type Playlist = PickArr<DBRundownPlaylist, typeof PLAYLIST_KEYS>

const PART_INSTANCES_KEYS = ['current', 'next', 'inCurrentSegment', 'firstInSegmentPlayout'] as const
type PartInstances = PickArr<SelectedPartInstances, typeof PART_INSTANCES_KEYS>

const PIECE_INSTANCES_KEYS = ['currentPartInstance', 'nextPartInstance'] as const
type PieceInstances = PickArr<SelectedPieceInstances, typeof PIECE_INSTANCES_KEYS>

export class ActivePlaylistTopic extends WebSocketTopicBase implements WebSocketTopic {
	public observerName = ActivePlaylistTopic.name
	private _activePlaylist: Playlist | undefined
	private _currentPartInstance: DBPartInstance | undefined
	private _nextPartInstance: DBPartInstance | undefined
	private _firstInstanceInSegmentPlayout: DBPartInstance | undefined
	private _partInstancesInCurrentSegment: DBPartInstance[] = []
	private _partsBySegmentId: Record<string, DBPart[]> = {}
	private _pieceInstancesInCurrentPartInstance: PieceInstanceMin[] | undefined
	private _pieceInstancesInNextPartInstance: PieceInstanceMin[] | undefined
	private _showStyleBaseExt: ShowStyleBaseExt | undefined

	constructor(logger: Logger, handlers: CollectionHandlers) {
		super(ActivePlaylistTopic.name, logger, THROTTLE_PERIOD_MS)

		handlers.playlistHandler.subscribe(this.onPlaylistUpdate, PLAYLIST_KEYS)
		handlers.partsHandler.subscribe(this.onPartsUpdate)
		handlers.partInstancesHandler.subscribe(this.onPartInstancesUpdate, PART_INSTANCES_KEYS)
		handlers.pieceInstancesHandler.subscribe(this.onPieceInstancesUpdate, PIECE_INSTANCES_KEYS)
		handlers.showStyleBaseHandler.subscribe(this.onShowStyleBaseUpdate)
	}

	sendStatus(subscribers: Iterable<WebSocket>): void {
		if (this.isDataInconsistent()) {
			// data is inconsistent, let's wait
			this._logger.debug('Encountered inconsistent data.')
			return
		}

		const currentPart = this._currentPartInstance ? this._currentPartInstance.part : null
		const nextPart = this._nextPartInstance ? this._nextPartInstance.part : null
		const currentSegmentParts =
			(currentPart && this._partsBySegmentId[unprotectString(currentPart.segmentId)]) ?? []

		const message = this._activePlaylist
			? literal<ActivePlaylistStatus>({
					event: 'activePlaylist',
					id: unprotectString(this._activePlaylist._id),
					name: this._activePlaylist.name,
					rundownIds: this._activePlaylist.rundownIdsInOrder.map((r) => unprotectString(r)),
					currentPart:
						this._currentPartInstance && currentPart
							? literal<CurrentPartStatus>({
									id: unprotectString(currentPart._id),
									name: currentPart.title,
									autoNext: currentPart.autoNext,
									segmentId: unprotectString(currentPart.segmentId),
									timing: calculateCurrentPartTiming(
										this._currentPartInstance,
										this._partInstancesInCurrentSegment
									),
									pieces:
										this._pieceInstancesInCurrentPartInstance?.map((piece) =>
											toPieceStatus(piece, this._showStyleBaseExt)
										) ?? [],
									publicData: currentPart.publicData,
							  })
							: null,
					currentSegment:
						this._currentPartInstance && currentPart
							? literal<CurrentSegmentStatus>({
									id: unprotectString(currentPart.segmentId),
									timing: calculateCurrentSegmentTiming(
										this._currentPartInstance,
										this._firstInstanceInSegmentPlayout,
										this._partInstancesInCurrentSegment,
										currentSegmentParts
									),
									parts: getCurrentSegmentParts(
										this._partInstancesInCurrentSegment,
										currentSegmentParts
									),
							  })
							: null,
					nextPart: nextPart
						? literal<PartStatus>({
								id: unprotectString(nextPart._id),
								name: nextPart.title,
								autoNext: nextPart.autoNext,
								segmentId: unprotectString(nextPart.segmentId),
								pieces:
									this._pieceInstancesInNextPartInstance?.map((piece) =>
										toPieceStatus(piece, this._showStyleBaseExt)
									) ?? [],
								publicData: nextPart.publicData,
						  })
						: null,
					publicData: this._activePlaylist.publicData,
			  })
			: literal<ActivePlaylistStatus>({
					event: 'activePlaylist',
					id: null,
					name: '',
					rundownIds: [],
					currentPart: null,
					currentSegment: null,
					nextPart: null,
					publicData: undefined,
			  })

		this.sendMessage(subscribers, message)
	}

	private isDataInconsistent() {
		return (
			this._currentPartInstance?._id !== this._activePlaylist?.currentPartInfo?.partInstanceId ||
			this._nextPartInstance?._id !== this._activePlaylist?.nextPartInfo?.partInstanceId ||
			(this._pieceInstancesInCurrentPartInstance?.[0] &&
				this._pieceInstancesInCurrentPartInstance?.[0].partInstanceId !== this._currentPartInstance?._id) ||
			(this._pieceInstancesInNextPartInstance?.[0] &&
				this._pieceInstancesInNextPartInstance?.[0].partInstanceId !== this._nextPartInstance?._id)
		)
	}

	private onPlaylistUpdate = (rundownPlaylist: Playlist | undefined): void => {
		this.logUpdateReceived(
			'playlist',
			`rundownPlaylistId ${rundownPlaylist?._id}, activationId ${rundownPlaylist?.activationId}`
		)
		this._activePlaylist = unprotectString(rundownPlaylist?.activationId) ? rundownPlaylist : undefined

		this.throttledSendStatusToAll()
	}

	private onPartsUpdate = (parts: DBPart[] | undefined): void => {
		const previousParts = this._partsBySegmentId
		this._partsBySegmentId = _.groupBy(parts ?? [], 'segmentId')
		this.logUpdateReceived('parts')

		const currentSegmentId = unprotectString(this._currentPartInstance?.segmentId)
		if (
			currentSegmentId &&
			!areElementsShallowEqual(previousParts[currentSegmentId], this._partsBySegmentId[currentSegmentId])
		) {
			// we have to collect all the parts, but only when those from the current segment change, we should update status
			this.throttledSendStatusToAll()
		}
	}

	private onPartInstancesUpdate = (partInstances: PartInstances | undefined): void => {
		this.logUpdateReceived('partInstances', `${partInstances?.inCurrentSegment.length} instances in segment`)

		if (!partInstances) return
		this._currentPartInstance = partInstances.current
		this._nextPartInstance = partInstances.next
		this._firstInstanceInSegmentPlayout = partInstances.firstInSegmentPlayout
		this._partInstancesInCurrentSegment = partInstances.inCurrentSegment
		this.throttledSendStatusToAll()
	}

	private onPieceInstancesUpdate = (pieceInstances: PieceInstances | undefined): void => {
		this.logUpdateReceived('pieceInstances')
		if (!pieceInstances) return

		this._pieceInstancesInCurrentPartInstance = pieceInstances.currentPartInstance
		this._pieceInstancesInNextPartInstance = pieceInstances.nextPartInstance
		this.throttledSendStatusToAll()
	}

	protected onShowStyleBaseUpdate = (showStyleBase: ShowStyleBaseExt | undefined): void => {
		this.logUpdateReceived('showStyleBase')
		this._showStyleBaseExt = showStyleBase
		this.throttledSendStatusToAll()
	}
}
