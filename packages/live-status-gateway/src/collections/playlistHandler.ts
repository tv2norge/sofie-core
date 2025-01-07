import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection } from '../wsHandler'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { CollectionHandlers } from '../liveStatusServer'

export class PlaylistsHandler
	extends CollectionBase<DBRundownPlaylist[], undefined, CollectionName.RundownPlaylists>
	implements Collection<DBRundownPlaylist[]>
{
	public observerName: string

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(CollectionName.RundownPlaylists, undefined, logger, coreHandler)
		this.observerName = this._name
	}

	setPlaylists(playlists: DBRundownPlaylist[]): void {
		this.logUpdateReceived('playlists', playlists.length)
		this._collectionData = playlists
		this.notify(this._collectionData)
	}
}

export class PlaylistHandler
	extends CollectionBase<DBRundownPlaylist, CorelibPubSub.rundownPlaylists, CollectionName.RundownPlaylists>
	implements Collection<DBRundownPlaylist>
{
	public observerName: string
	private _playlistsHandler: PlaylistsHandler

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(CollectionName.RundownPlaylists, CorelibPubSub.rundownPlaylists, logger, coreHandler)
		this.observerName = this._name
		this._playlistsHandler = new PlaylistsHandler(this._logger, this._coreHandler)
	}

	init(handlers: CollectionHandlers): void {
		super.init(handlers)
		this.setupSubscription({
			studioId: this._studioId,
		})
		// this._subscriptionId = await this._coreHandler.setupSubscription(this._publicationName, null, [this._studioId]) // in R51
	}

	changed(): void {
		this.updateAndNotify()
	}

	protected updateAndNotify(): void {
		const collection = this.getCollectionOrFail()
		const playlists = collection.find(undefined)
		this._playlistsHandler.setPlaylists(playlists)

		this.updateAndNotifyActivePlaylist(playlists)
	}

	private updateAndNotifyActivePlaylist(playlists: DBRundownPlaylist[]) {
		const prevActivePlaylist = this._collectionData
		const activePlaylist = playlists.find((p) => p.activationId)
		this._collectionData = activePlaylist
		if (prevActivePlaylist !== activePlaylist) {
			this.notify(this._collectionData)
		}
	}

	get playlistsHandler(): PlaylistsHandler {
		return this._playlistsHandler
	}
}
