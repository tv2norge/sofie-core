import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection, PickArr } from '../wsHandler'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { UIPieceContentStatus } from '@sofie-automation/corelib/dist/dataModel/PieceContentStatus'
import throttleToNextTick from '@sofie-automation/shared-lib/dist/lib/throttleToNextTick'
import { RundownPlaylistId } from '@sofie-automation/corelib/dist/dataModel/Ids'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { CollectionHandlers } from '../liveStatusServer'

const PLAYLIST_KEYS = ['_id'] as const
type Playlist = PickArr<DBRundownPlaylist, typeof PLAYLIST_KEYS>

export class PieceContentStatusesHandler
	extends CollectionBase<UIPieceContentStatus[], CorelibPubSub.uiPieceContentStatuses, 'uiPieceContentStatuses'>
	implements Collection<UIPieceContentStatus[]>
{
	public observerName: string
	private _currentPlaylistId: RundownPlaylistId | undefined

	private _throttledUpdateAndNotify = throttleToNextTick(() => {
		this.updateAndNotify()
	})

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super('uiPieceContentStatuses', CorelibPubSub.uiPieceContentStatuses, logger, coreHandler)
		this.observerName = this._name
	}

	init(handlers: CollectionHandlers): void {
		super.init(handlers)

		handlers.playlistHandler.subscribe(this.onPlaylistUpdated, PLAYLIST_KEYS)
	}

	changed(): void {
		this._throttledUpdateAndNotify()
	}

	private updateCollectionData() {
		const collection = this.getCollectionOrFail()
		this._collectionData = collection.find({})
	}

	private clearCollectionData() {
		this._collectionData = []
	}

	onPlaylistUpdated = (playlist: Playlist | undefined): void => {
		this.logUpdateReceived(
			'playlist',
			// source,
			`rundownPlaylistId ${playlist?._id}`
		)
		const prevPlaylistId = this._currentPlaylistId
		this._currentPlaylistId = playlist?._id

		if (this._currentPlaylistId) {
			if (prevPlaylistId !== this._currentPlaylistId) {
				this.stopSubscription()
				this.setupSubscription(this._currentPlaylistId)
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
		this.updateCollectionData()
		this.notify(this._collectionData)
	}
}
