import { Meteor } from 'meteor/meteor'
import { FindOptions } from '../../lib/collections/lib'
import { BucketSecurity } from '../security/buckets'
import { meteorPublish } from './lib'
import { MeteorPubSub } from '../../lib/api/pubsub'
import { Bucket } from '../../lib/collections/Buckets'
import { BucketAdLib } from '@sofie-automation/corelib/dist/dataModel/BucketAdLibPiece'
import { BucketAdLibAction } from '@sofie-automation/corelib/dist/dataModel/BucketAdLibAction'
import { StudioReadAccess } from '../security/studio'
import { isProtectedString } from '@sofie-automation/corelib/dist/protectedString'
import { BucketAdLibActions, BucketAdLibs, Buckets } from '../collections'
import { check, Match } from 'meteor/check'
import { MongoQuery } from '@sofie-automation/corelib/dist/mongo'
import { StudioId, BucketId } from '@sofie-automation/corelib/dist/dataModel/Ids'
import { CorelibPubSub } from '@sofie-automation/corelib/dist/pubsub'

meteorPublish(
	MeteorPubSub.buckets,
	async function (studioId: StudioId, bucketId: BucketId | null, _token: string | undefined) {
		check(studioId, String)
		check(bucketId, Match.Maybe(String))

		const modifier: FindOptions<Bucket> = {
			fields: {},
		}
		if (
			(await StudioReadAccess.studioContent(studioId, this)) ||
			(isProtectedString(bucketId) && bucketId && (await BucketSecurity.allowReadAccess(this, bucketId)))
		) {
			return Buckets.findWithCursor(
				bucketId
					? {
							_id: bucketId,
							studioId,
					  }
					: {
							studioId,
					  },
				modifier
			)
		}
		return null
	}
)

meteorPublish(
	CorelibPubSub.bucketAdLibPieces,
	async function (selector: MongoQuery<BucketAdLib>, _token: string | undefined) {
		if (!selector) throw new Meteor.Error(400, 'selector argument missing')
		const modifier: FindOptions<BucketAdLib> = {
			fields: {
				ingestInfo: 0, // This is a large blob, and is not of interest to the UI
			},
		}
		if (isProtectedString(selector.bucketId) && (await BucketSecurity.allowReadAccess(this, selector.bucketId))) {
			return BucketAdLibs.findWithCursor(selector, modifier)
		}
		return null
	}
)

meteorPublish(
	CorelibPubSub.bucketAdLibActions,
	async function (selector: MongoQuery<BucketAdLibAction>, _token: string | undefined) {
		if (!selector) throw new Meteor.Error(400, 'selector argument missing')
		const modifier: FindOptions<BucketAdLibAction> = {
			fields: {
				ingestInfo: 0, // This is a large blob, and is not of interest to the UI
			},
		}
		if (isProtectedString(selector.bucketId) && (await BucketSecurity.allowReadAccess(this, selector.bucketId))) {
			return BucketAdLibActions.findWithCursor(selector, modifier)
		}
		return null
	}
)
