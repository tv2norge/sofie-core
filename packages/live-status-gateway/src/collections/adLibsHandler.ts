import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection, PickArr } from '../wsHandler'
import { AdLibPiece } from '@sofie-automation/corelib/dist/dataModel/AdLibPiece'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { RundownId } from '@sofie-automation/corelib/dist/dataModel/Ids'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { CollectionHandlers } from '../liveStatusServer'

const PLAYLIST_KEYS = ['currentPartInfo', 'nextPartInfo'] as const
type Playlist = PickArr<DBRundownPlaylist, typeof PLAYLIST_KEYS>

export class AdLibsHandler
	extends CollectionBase<AdLibPiece[], CorelibPubSub.adLibPieces, CollectionName.AdLibPieces>
	implements Collection<AdLibPiece[]>
{
	public observerName: string
	// private _core: CoreConnection
	private _currentRundownId: RundownId | undefined

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(CollectionName.AdLibPieces, CorelibPubSub.adLibPieces, logger, coreHandler)
		this.observerName = this._name
	}

	init(handlers: CollectionHandlers): void {
		super.init(handlers)

		handlers.playlistHandler.subscribe(this.onPlaylistUpdate, PLAYLIST_KEYS)
	}

	changed(): void {
		this.updateAndNotify()
	}

	private onPlaylistUpdate = (data: Playlist | undefined): void => {
		this.logUpdateReceived('playlist')
		const prevRundownId = this._currentRundownId
		const rundownPlaylist = data

		this._currentRundownId = rundownPlaylist?.currentPartInfo?.rundownId ?? rundownPlaylist?.nextPartInfo?.rundownId

		if (prevRundownId !== this._currentRundownId) {
			this.stopSubscription()
			if (this._currentRundownId) {
				this.setupSubscription(
					{
						rundownId: this._currentRundownId,
					},
					true
				)
				// this._subscriptionId = await this._coreHandler.setupSubscription(this._publicationName, [
				// 	this._currentRundownId,
				// ]) // R51
			}
			// no need to trigger updateAndNotify() because the subscription will take care of this
		}
	}

	protected updateAndNotify(): void {
		const collection = this.getCollectionOrFail()
		this._collectionData = collection.find({ rundownId: this._currentRundownId })
		this.notify(this._collectionData)
	}

	// // override notify to implement empty array handling
	// notify(data: AdLibPiece[] | undefined): void {
	// 	this.logNotifyingUpdate(data?.length)
	// 	if (data !== undefined) {
	// 		for (const observer of this._observers) {
	// 			observer.update(this._name, data)
	// 		}
	// 	}
	// }
}
