import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection } from '../wsHandler'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import { BucketAdLibAction } from '@sofie-automation/corelib/dist/dataModel/BucketAdLibAction'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { CollectionHandlers } from '../liveStatusServer'

export class BucketAdLibActionsHandler
	extends CollectionBase<BucketAdLibAction[], CorelibPubSub.bucketAdLibActions, CollectionName.BucketAdLibActions>
	implements Collection<BucketAdLibAction[]>
{
	public observerName: string

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(CollectionName.BucketAdLibActions, CorelibPubSub.bucketAdLibActions, logger, coreHandler)
		this.observerName = this._name
	}

	changed(): void {
		const collection = this.getCollectionOrFail()
		this._collectionData = collection.find(undefined)
		this.notify(this._collectionData)
	}

	init(handlers: CollectionHandlers): void {
		super.init(handlers)
		this.setupSubscription({
			studioId: this._studioId,
		})
	}
}
