import { Logger } from 'winston'
import { CoreHandler } from '../coreHandler'
import { CollectionBase, Collection } from '../wsHandler'
import { DBRundown } from '@sofie-automation/corelib/dist/dataModel/Rundown'
import { CollectionName } from '@sofie-automation/corelib/dist/dataModel/Collections'

export class RundownsHandler
	extends CollectionBase<DBRundown[], undefined, CollectionName.Rundowns>
	implements Collection<DBRundown[]>
{
	public observerName: string

	constructor(logger: Logger, coreHandler: CoreHandler) {
		super(CollectionName.Rundowns, undefined, logger, coreHandler)
		this.observerName = this._name
	}

	setRundowns(rundowns: DBRundown[]): void {
		this.logUpdateReceived('rundowns', rundowns.length)
		this._collectionData = rundowns
		this.notify(this._collectionData)
	}
}
