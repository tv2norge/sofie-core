import { Meteor } from 'meteor/meteor'
import { Rundowns } from '../../lib/collections/Rundowns'
import { Pieces } from '../../lib/collections/Pieces'
import { Random } from 'meteor/random'
import * as _ from 'underscore'
import { logger } from '../logging'
import { MediaObjects } from '../../lib/collections/MediaObjects'
import { waitForPromise, waitForPromiseAll } from '../../lib/lib'
import { updateExpectedMediaItemsOnRundown } from '../api/ingest/expectedMediaItems'
import { RundownPlaylists, RundownPlaylistId } from '../../lib/collections/RundownPlaylists'
import { Settings } from '../../lib/Settings'
import { setNextPart } from '../api/playout/lib'
import { syncPlayheadInfinitesForNextPartInstance } from '../api/playout/infinites'
import { forceClearAllActivationCaches } from '../cache/ActivationCache'
import { PartInstances } from '../../lib/collections/PartInstances'
import { PieceInstances } from '../../lib/collections/PieceInstances'
import { updateTimeline } from '../api/playout/timeline'
import { forceClearAllBlueprintConfigCaches } from '../api/blueprints/config'
import { playoutWithCacheLockFunction } from '../api/playout/syncFunction'
import { getSelectedPartInstancesFromCache } from '../api/playout/cache'
import { removeRundownPlaylistFromDb } from '../api/rundownPlaylist'
import { ingestRundownOnlyLockFunction } from '../api/ingest/syncFunction'

if (!Settings.enableUserAccounts) {
	// These are temporary method to fill the rundown database with some sample data
	// for development

	Meteor.methods({
		debug_scrambleDurations() {
			let pieces = Pieces.find().fetch()
			_.each(pieces, (piece) => {
				Pieces.update(
					{ _id: piece._id },
					{
						$inc: {
							expectedDuration: Random.fraction() * 500 - 250,
						},
					}
				)
			})
		},

		debug_purgeMediaDB() {
			MediaObjects.remove({})
		},

		debug_removeRundown(id: RundownPlaylistId) {
			logger.debug('Remove rundown "' + id + '"')

			waitForPromise(removeRundownPlaylistFromDb(id))
		},

		debug_removeAllRos() {
			logger.debug('Remove all rundowns')

			waitForPromiseAll(RundownPlaylists.find({}).map((playlist) => removeRundownPlaylistFromDb(playlist._id)))
		},

		debug_recreateExpectedMediaItems() {
			const rundowns = Rundowns.find().fetch()

			rundowns.map((rundown) => {
				ingestRundownOnlyLockFunction('', rundown.studioId, rundown.externalId, async (cache) =>
					updateExpectedMediaItemsOnRundown(cache)
				)
			})
		},

		debug_syncPlayheadInfinitesForNextPartInstance(id: RundownPlaylistId) {
			logger.info(`syncPlayheadInfinitesForNextPartInstance ${id}`)

			playoutWithCacheLockFunction(null, 'debug_syncPlayheadInfinitesForNextPartInstance', id, null, (cache) => {
				syncPlayheadInfinitesForNextPartInstance(cache)
			})
		},

		debug_forceClearAllCaches() {
			logger.info('forceClearAllCaches')

			forceClearAllActivationCaches()
			forceClearAllBlueprintConfigCaches()
		},

		debug_clearAllResetInstances() {
			logger.info('clearAllResetInstances')

			PartInstances.remove({ reset: true })
			PieceInstances.remove({ reset: true })
		},

		debug_regenerateNextPartInstance(id: RundownPlaylistId) {
			logger.info('regenerateNextPartInstance')

			playoutWithCacheLockFunction(null, 'debug_regenerateNextPartInstance', id, null, (cache) => {
				const playlist = cache.Playlist.doc
				if (playlist.nextPartInstanceId && playlist.activationId) {
					const { nextPartInstance } = getSelectedPartInstancesFromCache(cache)
					const part = nextPartInstance ? cache.Parts.findOne(nextPartInstance.part._id) : undefined
					if (part) {
						setNextPart(cache, null)
						setNextPart(cache, part)

						updateTimeline(cache)
					}
				}
			})
		},
	})
}
