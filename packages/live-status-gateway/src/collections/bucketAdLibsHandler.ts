import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection } from '../wsHandler'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import { BucketAdLib } from '@sofie-automation/corelib/dist/dataModel/BucketAdLibPiece'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { CollectionHandlers } from '../liveStatusServer'

export class BucketAdLibsHandler
	extends CollectionBase<BucketAdLib[], CorelibPubSub.bucketAdLibPieces, CollectionName.BucketAdLibPieces>
	implements Collection<BucketAdLib[]>
{
	public observerName: string

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(CollectionName.BucketAdLibPieces, CorelibPubSub.bucketAdLibPieces, logger, coreHandler)
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
