import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection, PickArr } from '../wsHandler'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { DBRundown } from '@sofie-automation/corelib/dist/dataModel/Rundown'
import { RundownId, RundownPlaylistId } from '@sofie-automation/corelib/dist/dataModel/Ids'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import { RundownsHandler } from './rundownsHandler'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { CollectionHandlers } from '../liveStatusServer'
import { unprotectString } from '@sofie-automation/server-core-integration'

const PLAYLIST_KEYS = ['_id', 'currentPartInfo', 'nextPartInfo'] as const
type Playlist = PickArr<DBRundownPlaylist, typeof PLAYLIST_KEYS>

export class RundownHandler
	extends CollectionBase<DBRundown, CorelibPubSub.rundowns, CollectionName.Rundowns>
	implements Collection<DBRundown>
{
	public observerName: string
	private _currentPlaylistId: RundownPlaylistId | undefined
	private _currentRundownId: RundownId | undefined

	constructor(logger: Logger, coreHandler: CoreHandler, private _rundownsHandler?: RundownsHandler) {
		super(CollectionName.Rundowns, CorelibPubSub.rundowns, logger, coreHandler)
		this.observerName = this._name
	}

	init(handlers: CollectionHandlers): void {
		super.init(handlers)

		handlers.playlistHandler.subscribe(this.onPlaylistUpdate, PLAYLIST_KEYS)
	}

	changed(): void {
		this.updateAndNotify()
	}

	protected updateAndNotify(): void {
		const collection = this.getCollectionOrFail()
		this._rundownsHandler?.setRundowns(collection.find(undefined))
		if (this._currentRundownId) {
			this._collectionData = collection.findOne(this._currentRundownId)
		} else {
			this._collectionData = undefined
		}
		this.notify(this._collectionData)
	}

	private onPlaylistUpdate = (data: Playlist | undefined): void => {
		const prevPlaylistId = this._currentPlaylistId
		const prevCurRundownId = this._currentRundownId
		const rundownPlaylist = data

		this.logUpdateReceived('playlist', unprotectString(rundownPlaylist?._id))
		this._currentPlaylistId = rundownPlaylist?._id
		this._currentRundownId = rundownPlaylist?.currentPartInfo?.rundownId ?? rundownPlaylist?.nextPartInfo?.rundownId

		if (prevPlaylistId !== this._currentPlaylistId) {
			this.stopSubscription()
			if (this._currentPlaylistId) {
				this.setupSubscription([this._currentPlaylistId], undefined)
				// this._subscriptionId = await this._coreHandler.setupSubscription(this._publicationName, [
				// 	this._currentPlaylistId,
				// ]) // R51
			}
			return
		}

		if (prevCurRundownId !== this._currentRundownId) {
			this.updateAndNotify()
		}
	}
}
