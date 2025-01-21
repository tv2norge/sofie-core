import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection } from '../wsHandler'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import { Bucket } from '@sofie-automation/corelib/dist/dataModel/Bucket'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { CollectionHandlers } from '../liveStatusServer'

export class BucketsHandler
	extends CollectionBase<Bucket[], CorelibPubSub.buckets, CollectionName.Buckets>
	implements Collection<Bucket[]>
{
	public observerName: string

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(CollectionName.Buckets, CorelibPubSub.buckets, logger, coreHandler)
		this.observerName = this._name
	}

	changed(): void {
		const collection = this.getCollectionOrFail()
		this._collectionData = collection.find(undefined)
		this.notify(this._collectionData)
	}

	init(handlers: CollectionHandlers): void {
		super.init(handlers)
		this.setupSubscription(this._studioId, undefined)
	}
}
