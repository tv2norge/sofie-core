import { Logger } from 'winston'
import { WebSocket } from 'ws'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { WebSocketTopicBase, WebSocketTopic, PickArr } from '../wsHandler'
import { DBSegment } from '@sofie-automation/corelib/dist/dataModel/Segment'
import { groupByToMap } from '@sofie-automation/corelib/dist/lib'
import { unprotectString } from '@sofie-automation/shared-lib/dist/lib/protectedString'
import { DBPart } from '@sofie-automation/corelib/dist/dataModel/Part'
import _ = require('underscore')
import { SegmentTiming, calculateSegmentTiming } from './helpers/segmentTiming'
import { CollectionHandlers } from '../liveStatusServer'

const THROTTLE_PERIOD_MS = 200

interface SegmentStatus {
	id: string
	identifier?: string
	rundownId: string
	name: string
	timing: SegmentTiming
	publicData: unknown
}

export interface SegmentsStatus {
	event: 'segments'
	rundownPlaylistId: string | null
	segments: SegmentStatus[]
}

const PLAYLIST_KEYS = ['_id', 'rundownIdsInOrder', 'activationId'] as const
type Playlist = PickArr<DBRundownPlaylist, typeof PLAYLIST_KEYS>

export class SegmentsTopic extends WebSocketTopicBase implements WebSocketTopic {
	public observerName = SegmentsTopic.name
	private _activePlaylist: Playlist | undefined
	private _segments: DBSegment[] = []
	private _partsBySegment: Record<string, DBPart[]> = {}
	private _orderedSegments: DBSegment[] = []

	constructor(logger: Logger, handlers: CollectionHandlers) {
		super(SegmentsTopic.name, logger, THROTTLE_PERIOD_MS)

		handlers.playlistHandler.subscribe(this.onPlaylistUpdate, PLAYLIST_KEYS)
		handlers.segmentsHandler.subscribe(this.onSegmentsUpdate)
		handlers.partsHandler.subscribe(this.onPartsUpdate)
	}

	sendStatus(subscribers: Iterable<WebSocket>): void {
		const segmentsStatus: SegmentsStatus = {
			event: 'segments',
			rundownPlaylistId: this._activePlaylist ? unprotectString(this._activePlaylist._id) : null,
			segments: this._orderedSegments.map((segment) => {
				const segmentId = unprotectString(segment._id)
				return {
					id: segmentId,
					rundownId: unprotectString(segment.rundownId),
					name: segment.name,
					timing: calculateSegmentTiming(this._partsBySegment[segmentId] ?? []),
					identifier: segment.identifier,
					publicData: segment.publicData,
				}
			}),
		}

		this.sendMessage(subscribers, segmentsStatus)
	}

	private onPlaylistUpdate = (rundownPlaylist: Playlist | undefined): void => {
		this.logUpdateReceived(
			'playlist',
			`rundownPlaylistId ${rundownPlaylist?._id}, activationId ${rundownPlaylist?.activationId}`
		)
		this._activePlaylist = rundownPlaylist
		this.updateAndSendStatusToAll()
	}

	protected onSegmentsUpdate = (segments: DBSegment[] | undefined): void => {
		this.logUpdateReceived('segments')
		this._segments = segments ?? []
		this.updateAndSendStatusToAll()
	}

	protected onPartsUpdate = (parts: DBPart[] | undefined): void => {
		this.logUpdateReceived('parts')
		this._partsBySegment = _.groupBy(parts ?? [], 'segmentId')
		this.updateAndSendStatusToAll()
	}

	private updateAndSendStatusToAll() {
		const segmentsByRundownId = groupByToMap(this._segments, 'rundownId')
		this._orderedSegments =
			this._activePlaylist?.rundownIdsInOrder.flatMap((rundownId) => {
				return segmentsByRundownId.get(rundownId)?.sort((a, b) => a._rank - b._rank) ?? []
			}) ?? []
		this.throttledSendStatusToAll()
	}
}
