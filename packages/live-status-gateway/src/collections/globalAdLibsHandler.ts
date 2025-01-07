import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection, PickArr } from '../wsHandler'
import { RundownBaselineAdLibItem } from '@sofie-automation/corelib/dist/dataModel/RundownBaselineAdLibPiece'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { RundownId } from '@sofie-automation/corelib/dist/dataModel/Ids'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { CollectionHandlers } from '../liveStatusServer'

const PLAYLIST_KEYS = ['currentPartInfo', 'nextPartInfo'] as const
type Playlist = PickArr<DBRundownPlaylist, typeof PLAYLIST_KEYS>

export class GlobalAdLibsHandler
	extends CollectionBase<
		RundownBaselineAdLibItem[],
		CorelibPubSub.rundownBaselineAdLibPieces,
		CollectionName.RundownBaselineAdLibPieces
	>
	implements Collection<RundownBaselineAdLibItem[]>
{
	public observerName: string
	private _currentRundownId: RundownId | undefined

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(CollectionName.RundownBaselineAdLibPieces, CorelibPubSub.rundownBaselineAdLibPieces, logger, coreHandler)
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
				// ]) // In R51
			}
		}
	}

	protected updateAndNotify(): void {
		const collection = this.getCollectionOrFail()
		this._collectionData = collection.find({ rundownId: this._currentRundownId })
		this.notify(this._collectionData)
	}
}
