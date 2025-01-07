import { Logger } from 'winston'
import { CoreHandler } from './coreHandler'
import { WebSocket, WebSocketServer } from 'ws'
import { StudioHandler } from './collections/studioHandler'
import { ShowStyleBaseHandler } from './collections/showStyleBaseHandler'
import { PlaylistHandler, PlaylistsHandler } from './collections/playlistHandler'
import { RundownHandler } from './collections/rundownHandler'
// import { RundownsHandler } from './collections/rundownsHandler'
import { SegmentHandler } from './collections/segmentHandler'
// import { PartHandler } from './collections/part'
import { PartInstancesHandler } from './collections/partInstancesHandler'
import { AdLibActionsHandler } from './collections/adLibActionsHandler'
import { GlobalAdLibActionsHandler } from './collections/globalAdLibActionsHandler'
import { RootChannel, StatusChannels } from './topics/root'
import { StudioTopic } from './topics/studioTopic'
import { ActivePlaylistTopic } from './topics/activePlaylistTopic'
import { AdLibsHandler } from './collections/adLibsHandler'
import { GlobalAdLibsHandler } from './collections/globalAdLibsHandler'
import { SegmentsTopic } from './topics/segmentsTopic'
import { SegmentsHandler } from './collections/segmentsHandler'
import { PartHandler } from './collections/partHandler'
import { PartsHandler } from './collections/partsHandler'
import { PieceInstancesHandler } from './collections/pieceInstancesHandler'
import { AdLibsTopic } from './topics/adLibsTopic'
import { BucketsTopic } from './topics/bucketsTopic'
import { BucketAdLibsHandler } from './collections/bucketAdLibsHandler'
import { BucketAdLibActionsHandler } from './collections/bucketAdLibActionsHandler'
import { BucketsHandler } from './collections/bucketsHandler'
import { PieceContentStatusesHandler } from './collections/pieceContentStatusesHandler'
import { PackagesTopic } from './topics/packagesTopic'
import { ActivePiecesTopic } from './topics/activePiecesTopic'

export interface CollectionHandlers {
	studioHandler: StudioHandler
	showStyleBaseHandler: ShowStyleBaseHandler
	playlistHandler: PlaylistHandler
	playlistsHandler: PlaylistsHandler
	rundownHandler: RundownHandler
	segmentsHandler: SegmentsHandler
	segmentHandler: SegmentHandler
	partsHandler: PartsHandler
	partHandler: PartHandler
	partInstancesHandler: PartInstancesHandler
	pieceInstancesHandler: PieceInstancesHandler
	adLibActionsHandler: AdLibActionsHandler
	adLibsHandler: AdLibsHandler
	globalAdLibActionsHandler: GlobalAdLibActionsHandler
	globalAdLibsHandler: GlobalAdLibsHandler
	bucketsHandler: BucketsHandler
	bucketAdLibsHandler: BucketAdLibsHandler
	bucketAdLibActionsHandler: BucketAdLibActionsHandler
	pieceContentStatusesHandler: PieceContentStatusesHandler
}

export class LiveStatusServer {
	_logger: Logger
	_coreHandler: CoreHandler
	_clients: Set<WebSocket> = new Set()

	constructor(logger: Logger, coreHandler: CoreHandler) {
		this._logger = logger
		this._coreHandler = coreHandler
	}

	async init(): Promise<void> {
		this._logger.info('Initializing WebSocket server...')

		const rootChannel = new RootChannel(this._logger)

		const studioHandler = new StudioHandler(this._logger, this._coreHandler)
		const showStyleBaseHandler = new ShowStyleBaseHandler(this._logger, this._coreHandler)
		const playlistHandler = new PlaylistHandler(this._logger, this._coreHandler)
		const playlistsHandler = playlistHandler.playlistsHandler
		const rundownHandler = new RundownHandler(this._logger, this._coreHandler)
		const segmentsHandler = new SegmentsHandler(this._logger, this._coreHandler)
		const segmentHandler = new SegmentHandler(this._logger, this._coreHandler, segmentsHandler)
		const partsHandler = new PartsHandler(this._logger, this._coreHandler)
		const partHandler = new PartHandler(this._logger, this._coreHandler, partsHandler)
		const partInstancesHandler = new PartInstancesHandler(this._logger, this._coreHandler)
		const pieceInstancesHandler = new PieceInstancesHandler(this._logger, this._coreHandler)
		const adLibActionsHandler = new AdLibActionsHandler(this._logger, this._coreHandler)
		const adLibsHandler = new AdLibsHandler(this._logger, this._coreHandler)
		const globalAdLibActionsHandler = new GlobalAdLibActionsHandler(this._logger, this._coreHandler)
		const globalAdLibsHandler = new GlobalAdLibsHandler(this._logger, this._coreHandler)
		const bucketsHandler = new BucketsHandler(this._logger, this._coreHandler)
		const bucketAdLibsHandler = new BucketAdLibsHandler(this._logger, this._coreHandler)
		const bucketAdLibActionsHandler = new BucketAdLibActionsHandler(this._logger, this._coreHandler)
		const pieceContentStatusesHandler = new PieceContentStatusesHandler(this._logger, this._coreHandler)

		const handlers: CollectionHandlers = {
			studioHandler,
			showStyleBaseHandler,
			playlistHandler,
			playlistsHandler,
			rundownHandler,
			segmentsHandler,
			segmentHandler,
			partsHandler,
			partHandler,
			partInstancesHandler,
			pieceInstancesHandler,
			adLibActionsHandler,
			adLibsHandler,
			globalAdLibActionsHandler,
			globalAdLibsHandler,
			bucketsHandler,
			bucketAdLibsHandler,
			bucketAdLibActionsHandler,
			pieceContentStatusesHandler,
		}

		for (const handlerName in handlers) {
			handlers[handlerName as keyof CollectionHandlers].init(handlers)
		}

		const studioTopic = new StudioTopic(this._logger, handlers)
		const activePiecesTopic = new ActivePiecesTopic(this._logger, handlers)
		const activePlaylistTopic = new ActivePlaylistTopic(this._logger, handlers)
		const segmentsTopic = new SegmentsTopic(this._logger, handlers)
		const adLibsTopic = new AdLibsTopic(this._logger, handlers)
		const bucketsTopic = new BucketsTopic(this._logger, handlers)
		const packageStatusTopic = new PackagesTopic(this._logger, handlers)

		rootChannel.addTopic(StatusChannels.studio, studioTopic)
		rootChannel.addTopic(StatusChannels.activePlaylist, activePlaylistTopic)
		rootChannel.addTopic(StatusChannels.activePieces, activePiecesTopic)
		rootChannel.addTopic(StatusChannels.segments, segmentsTopic)
		rootChannel.addTopic(StatusChannels.adLibs, adLibsTopic)
		rootChannel.addTopic(StatusChannels.buckets, bucketsTopic)
		rootChannel.addTopic(StatusChannels.packages, packageStatusTopic)

		const wss = new WebSocketServer({ port: 8080 })
		wss.on('connection', (ws, request) => {
			this._logger.info(`WebSocket connection requested for path '${request.url}'`)

			ws.on('close', () => {
				this._logger.info(`Closing websocket`)
				rootChannel.removeSubscriber(ws)
				this._clients.delete(ws)
			})
			this._clients.add(ws)

			if (typeof request.url === 'string' && request.url === '/') {
				rootChannel.addSubscriber(ws)
				ws.on('message', (data) => rootChannel.processMessage(ws, data))
			} else {
				this._logger.error(`WebSocket connection request for unsupported path '${request.url}'`)
			}
		})
		wss.on('close', () => {
			this._logger.info(`WebSocket connection closed`)
			rootChannel.close()
		})
		wss.on('error', (err) => this._logger.error(err.message))

		this._logger.info('WebSocket server initialized')
	}
}
