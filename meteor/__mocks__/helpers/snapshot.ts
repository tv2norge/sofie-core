import * as _ from 'underscore'
import { clone } from '../../lib/lib'
import { TimelineObjGeneric } from '../../lib/collections/Timeline'
import { DBRundown } from '../../lib/collections/Rundowns'
import { DBSegment } from '../../lib/collections/Segments'
import { Part } from '../../lib/collections/Parts'
import { Piece } from '../../lib/collections/Pieces'

// About snapshot testing: https://jestjs.io/docs/en/snapshot-testing

type Data = undefined | TimelineObjGeneric | DBRundown | DBSegment | Part | Piece
/**
 * Remove certain fields from data that change often, so that it can be used in snapshots
 * @param data
 */
export function fixSnapshot (
	data: Data | Array<Data>
) {
	if (_.isArray(data)) {
		return _.map(data, fixSnapshot)
	} else {
		let o = clone(data)
		if (!o) return o
		if (isTimelineObj(o)) {
			delete o['modified']
			if (o.content) {
				delete o.content['modified']
				delete o.content['objHash']

			}
		} else if (isRundown(o)) {
			delete o['created']
			delete o['modified']
		// } else if (isPiece(o)) {
		// } else if (isPart(o)) {
		// } else if (isSegment(o)) {
		}
		return o
	}
}
function isTimelineObj (o): o is TimelineObjGeneric {
	return o.enable && o._id && o.id && o.studioId
}
function isRundown (o): o is DBRundown {
	return o._id && _.has(o, 'currentPartId')
}
function isSegment (o): o is DBSegment {
	return (
		o._id &&
		_.has(o, 'rundownId') &&
		_.has(o, 'externalId') &&
		_.has(o, 'name')
	)
}
function isPart (o): o is Part {
	return (
		o._id &&
		_.has(o, 'rundownId') &&
		_.has(o, 'externalId') &&
		_.has(o, 'segmentId') &&
		_.has(o, 'title')
	)
}
function isPiece (o): o is Piece {
	return (
		o._id &&
		_.has(o, 'rundownId') &&
		_.has(o, 'externalId') &&
		_.has(o, 'partId')
	)
}
