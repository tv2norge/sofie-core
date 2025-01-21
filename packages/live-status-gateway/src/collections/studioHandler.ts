import { Logger } from 'winston'
import { DBStudio } from '@sofie-automation/corelib/dist/dataModel/Studio'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection } from '../wsHandler'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { CollectionHandlers } from '../liveStatusServer'

export class StudioHandler
	extends CollectionBase<DBStudio, CorelibPubSub.studios, CollectionName.Studios>
	implements Collection<DBStudio>
{
	public observerName: string

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(CollectionName.Studios, CorelibPubSub.studios, logger, coreHandler)
		this.observerName = this._name
	}

	init(handlers: CollectionHandlers): void {
		super.init(handlers)

		this.setupSubscription({ _id: this._studioId })
		// this._subscriptionId = await this._coreHandler.setupSubscription(this._publicationName, [this._studioId]) // in R51
	}

	changed(): void {
		const collection = this.getCollectionOrFail()
		const studio = collection.findOne(this._studioId)
		this._collectionData = studio
		this.notify(this._collectionData)
	}
}
