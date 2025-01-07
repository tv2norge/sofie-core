import { Logger } from 'winston'
import { WebSocket } from 'ws'
import { unprotectString } from '@sofie-automation/shared-lib/dist/lib/protectedString'
import { literal } from '@sofie-automation/shared-lib/dist/lib/lib'
import { WebSocketTopicBase, WebSocketTopic, PickArr } from '../wsHandler'
import { ShowStyleBaseExt } from '../collections/showStyleBaseHandler'
import { SelectedPieceInstances, PieceInstanceMin } from '../collections/pieceInstancesHandler'
import { PieceStatus, toPieceStatus } from './helpers/pieceStatus'
import { RundownPlaylistId } from '@sofie-automation/corelib/dist/dataModel/Ids'
import { CollectionHandlers } from '../liveStatusServer'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'

const THROTTLE_PERIOD_MS = 100

export interface ActivePiecesStatus {
	event: 'activePieces'
	rundownPlaylistId: string | null
	activePieces: PieceStatus[]
}

const PLAYLIST_KEYS = ['_id', 'activationId'] as const
type Playlist = PickArr<DBRundownPlaylist, typeof PLAYLIST_KEYS>

const PIECE_INSTANCES_KEYS = ['active'] as const
type PieceInstances = PickArr<SelectedPieceInstances, typeof PIECE_INSTANCES_KEYS>

export class ActivePiecesTopic extends WebSocketTopicBase implements WebSocketTopic {
	public observerName = ActivePiecesTopic.name
	private _activePlaylistId: RundownPlaylistId | undefined
	private _activePieceInstances: PieceInstanceMin[] | undefined
	private _showStyleBaseExt: ShowStyleBaseExt | undefined

	constructor(logger: Logger, handlers: CollectionHandlers) {
		super(ActivePiecesTopic.name, logger, THROTTLE_PERIOD_MS)

		handlers.playlistHandler.subscribe(this.onPlaylistUpdate, PLAYLIST_KEYS)
		handlers.showStyleBaseHandler.subscribe(this.onShowStyleBaseUpdate)
		handlers.pieceInstancesHandler.subscribe(this.onPieceInstancesUpdate, PIECE_INSTANCES_KEYS)
	}

	sendStatus(subscribers: Iterable<WebSocket>): void {
		const message = this._activePlaylistId
			? literal<ActivePiecesStatus>({
					event: 'activePieces',
					rundownPlaylistId: unprotectString(this._activePlaylistId),
					activePieces:
						this._activePieceInstances?.map((piece) => toPieceStatus(piece, this._showStyleBaseExt)) ?? [],
			  })
			: literal<ActivePiecesStatus>({
					event: 'activePieces',
					rundownPlaylistId: null,
					activePieces: [],
			  })

		this.sendMessage(subscribers, message)
	}

	protected onShowStyleBaseUpdate = (showStyleBase: ShowStyleBaseExt | undefined): void => {
		this.logUpdateReceived('showStyleBase')
		this._showStyleBaseExt = showStyleBase
		this.throttledSendStatusToAll()
	}

	protected onPlaylistUpdate = (rundownPlaylist: Playlist | undefined): void => {
		this.logUpdateReceived(
			'playlist',
			`rundownPlaylistId ${rundownPlaylist?._id}, activationId ${rundownPlaylist?.activationId}`
		)
		const previousActivePlaylistId = this._activePlaylistId
		this._activePlaylistId = unprotectString(rundownPlaylist?.activationId) ? rundownPlaylist?._id : undefined

		if (previousActivePlaylistId !== this._activePlaylistId) {
			this.throttledSendStatusToAll()
		}
	}

	protected onPieceInstancesUpdate = (pieceInstances: PieceInstances | undefined): void => {
		this.logUpdateReceived('pieceInstances')
		const prevPieceInstances = this._activePieceInstances
		this._activePieceInstances = pieceInstances?.active
		if (prevPieceInstances !== this._activePieceInstances) {
			this.throttledSendStatusToAll()
		}
	}
}
