import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection } from '../wsHandler'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import { Bucket } from '@sofie-automation/corelib/dist/dataModel/Bucket'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'
import { BucketId } from '@sofie-automation/corelib/dist/dataModel/Ids'

export class BucketsHandler
	extends CollectionBase<Bucket[], CorelibPubSub.buckets, CollectionName.Buckets>
	implements Collection<Bucket[]>
{
	public observerName: string

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(BucketsHandler.name, CollectionName.Buckets, CorelibPubSub.buckets, logger, coreHandler)
		this.observerName = this._name
	}

	async changed(id: BucketId, changeType: string): Promise<void> {
		this.logDocumentChange(id, changeType)
		if (!this._collectionName) return
		const collection = this._core.getCollection<Bucket>(this._collectionName)
		if (!collection) throw new Error(`collection '${this._collectionName}' not found!`)
		this._collectionData = collection.find(undefined)
		await this.notify(this._collectionData)
	}

	async init(): Promise<void> {
		await super.init()
		if (!this._collectionName) return
		if (!this._publicationName) return
		if (!this._studioId) return
		this._subscriptionId = await this._coreHandler.setupSubscription(
			this._publicationName,
			this._studioId,
			undefined
		)
		this._dbObserver = this._coreHandler.setupObserver(this._collectionName)

		if (this._collectionName) {
			const collection = this._core.getCollection<Bucket>(this._collectionName)
			if (!collection) throw new Error(`collection '${this._collectionName}' not found!`)
			const buckets = collection.find(undefined)
			this._collectionData = buckets
			this._dbObserver.added = (id) => {
				void this.changed(id, 'added').catch(this._logger.error)
			}
			this._dbObserver.changed = (id) => {
				void this.changed(id, 'changed').catch(this._logger.error)
			}
			this._dbObserver.removed = (id) => {
				void this.changed(id, 'removed').catch(this._logger.error)
			}
		}
	}
}
