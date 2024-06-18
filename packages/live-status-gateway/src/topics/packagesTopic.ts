import { Logger } from 'winston'
import { WebSocket } from 'ws'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { WebSocketTopicBase, WebSocketTopic, CollectionObserver } from '../wsHandler'
import { PlaylistHandler } from '../collections/playlistHandler'
import { unprotectString } from '@sofie-automation/shared-lib/dist/lib/protectedString'
import _ = require('underscore')
import { PieceContentStatusesHandler } from '../collections/pieceContentStatusesHandler'
import { UIPieceContentStatus } from '@sofie-automation/corelib/dist/dataModel/PieceContentStatus'
import { PieceStatusCode } from '@sofie-automation/corelib/dist/dataModel/Piece'

const THROTTLE_PERIOD_MS = 200

interface PackageStatus {
	packageName: string | null
	statusCode: PieceStatusCode

	rundownId: string
	partId?: string
	segmentId?: string

	pieceId: string

	thumbnailUrl?: string
	previewUrl?: string
}

export interface PackagesStatus {
	event: 'packages'
	rundownPlaylistId: string | null
	packages: PackageStatus[]
}

export class PackagesTopic
	extends WebSocketTopicBase
	implements WebSocketTopic, CollectionObserver<UIPieceContentStatus[]>, CollectionObserver<DBRundownPlaylist>
{
	public observerName = PackagesTopic.name
	private _activePlaylist: DBRundownPlaylist | undefined
	private _pieceContentStatuses: UIPieceContentStatus[] = []
	private throttledSendStatusToAll: () => void

	constructor(logger: Logger) {
		super(PackagesTopic.name, logger)
		this.throttledSendStatusToAll = _.throttle(this.sendStatusToAll.bind(this), THROTTLE_PERIOD_MS, {
			leading: true,
			trailing: true,
		})
	}

	addSubscriber(ws: WebSocket): void {
		super.addSubscriber(ws)
		this.sendStatus([ws])
	}

	sendStatus(subscribers: Iterable<WebSocket>): void {
		const packagesStatus: PackagesStatus = {
			event: 'packages',
			rundownPlaylistId: this._activePlaylist ? unprotectString(this._activePlaylist._id) : null,
			packages: this._pieceContentStatuses.map((contentStatus) => ({
				packageName: contentStatus.status.packageName,
				statusCode: contentStatus.status.status,
				pieceId: unprotectString(contentStatus.pieceId),
				rundownId: unprotectString(contentStatus.rundownId),
				partId: unprotectString(contentStatus.partId),
				segmentId: unprotectString(contentStatus.segmentId),
				previewUrl: contentStatus.status.previewUrl,
				thumbnailUrl: contentStatus.status.thumbnailUrl,
			})),
		}

		for (const subscriber of subscribers) {
			this.sendMessage(subscriber, packagesStatus)
		}
	}

	async update(source: string, data: DBRundownPlaylist | UIPieceContentStatus[] | undefined): Promise<void> {
		let hasAnythingChanged = false
		switch (source) {
			case PlaylistHandler.name: {
				const prevPlaylistId = this._activePlaylist?._id
				this._activePlaylist = data as DBRundownPlaylist | undefined
				if (prevPlaylistId !== this._activePlaylist?._id) {
					hasAnythingChanged = true
				}
				this.logUpdateReceived('playlist', source)
				break
			}
			case PieceContentStatusesHandler.name: {
				this._pieceContentStatuses = data as UIPieceContentStatus[]
				hasAnythingChanged = true
				this.logUpdateReceived('pieceContentStatuses', source)
				break
			}
			default:
				throw new Error(`${this._name} received unsupported update from ${source}}`)
		}
		if (hasAnythingChanged) {
			this.throttledSendStatusToAll()
		}
	}

	private sendStatusToAll() {
		this.sendStatus(this._subscribers)
	}
}
