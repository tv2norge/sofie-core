import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection } from '../wsHandler'
import { CoreConnection } from '@sofie-automation/server-core-integration'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'
import { BucketAdLib } from '@sofie-automation/corelib/dist/dataModel/BucketAdLibPiece'

export class BucketAdLibsHandler extends CollectionBase<BucketAdLib[]> implements Collection<BucketAdLib[]> {
	public observerName: string
	private _core: CoreConnection

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(BucketAdLibsHandler.name, CollectionName.BucketAdLibPieces, 'bucketAdLibPieces', logger, coreHandler)
		this._core = coreHandler.coreConnection
		this.observerName = this._name
	}

	async changed(id: string, changeType: string): Promise<void> {
		this._logger.info(`${this._name} ${changeType} ${id}`)
		if (!this._collectionName) return
		const collection = this._core.getCollection<BucketAdLib>(this._collectionName)
		if (!collection) throw new Error(`collection '${this._collectionName}' not found!`)
		this._collectionData = collection.find(undefined)
		await this.notify(this._collectionData)
	}

	async init(): Promise<void> {
		await super.init()
		if (!this._collectionName) return
		if (!this._publicationName) return
		if (!this._studioId) return
		this._subscriptionId = await this._coreHandler.setupSubscription(this._publicationName, {
			studioId: this._studioId,
		})
		this._dbObserver = this._coreHandler.setupObserver(this._collectionName)

		if (this._collectionName) {
			const collection = this._core.getCollection<BucketAdLib>(this._collectionName)
			if (!collection) throw new Error(`collection '${this._collectionName}' not found!`)
			const bucketAdLibs = collection.find(undefined)
			this._collectionData = bucketAdLibs
			this._dbObserver.added = (id: string) => {
				void this.changed(id, 'added').catch(this._logger.error)
			}
			this._dbObserver.changed = (id: string) => {
				void this.changed(id, 'changed').catch(this._logger.error)
			}
			this._dbObserver.removed = (id: string) => {
				void this.changed(id, 'removed').catch(this._logger.error)
			}
		}
	}
}
