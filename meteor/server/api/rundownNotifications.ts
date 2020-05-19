import { Meteor } from 'meteor/meteor'
import { RundownNotificationsAPI, IMediaObjectIssue, RundownNotificationsAPIMethods, RankedNote } from '../../lib/api/rundownNotifications'
import { registerClassToMeteorMethods } from '../methods'
import { RundownId } from '../../lib/collections/Rundowns'
import { PartNote } from '../../lib/api/notes'
import { makePromise } from '../../lib/lib'
import { getSegmentPartNotes, getMediaObjectIssues } from '../../lib/rundownNotifications'
import { MethodContextAPI, MethodContext } from '../../lib/api/methods'
import { RundownReadAccess } from '../security/rundown'

class ServerRundownNotificationsAPI extends MethodContextAPI implements RundownNotificationsAPI {
	getSegmentPartNotes (rundownIds: RundownId[]): Promise<(PartNote & { rank: number; })[]> {
		const access = RundownReadAccess.rundownContent({ rundownId: rundownIds }, this)
		if (!access) throw new Meteor.Error(401, 'Invalid access creditials for Segment Parts Notes')
		return makePromise(() => getSegmentPartNotes.apply(this, [rundownIds]))
	}
	getMediaObjectIssues (rundownIds: RundownId[]): Promise<IMediaObjectIssue[]> {
		const access = RundownReadAccess.rundownContent({ rundownId: rundownIds }, this)
		if (!access) throw new Meteor.Error(401, 'Invalid access creditials for Media Object Issues')
		return makePromise(() => getMediaObjectIssues.apply(this, [rundownIds]))
	}
}
registerClassToMeteorMethods(RundownNotificationsAPIMethods, ServerRundownNotificationsAPI, false)
