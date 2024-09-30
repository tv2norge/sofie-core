import { Meteor } from 'meteor/meteor'
import { RundownPlaylistActivationId, ShowStyleBaseId } from '@sofie-automation/corelib/dist/dataModel/Ids'
import { RundownPlaylists, ShowStyleBases, PieceInstances, PartInstances } from '../../collections'
import { logger } from '../../logging'
import { rundownPlaylistFieldSpecifier } from './reactiveContentCache'
import {
	ContentCache,
	createReactiveContentCache,
	partInstanceFieldSpecifier,
	pieceInstanceFieldSpecifier,
} from './reactiveContentCacheForPieceInstances'

const REACTIVITY_DEBOUNCE = 20

type ChangedHandler = (cache: ContentCache) => () => void

export class PieceInstancesObserver {
	#observers: Meteor.LiveQueryHandle[] = []
	#cache: ContentCache
	#cancelCache: () => void
	#cleanup: (() => void) | undefined
	#disposed = false

	constructor(
		activationId: RundownPlaylistActivationId,
		showStyleBaseId: ShowStyleBaseId,
		onChanged: ChangedHandler
	) {
		logger.silly(`Creating PieceInstancesObserver for activationId "${activationId}"`)
		const { cache, cancel: cancelCache } = createReactiveContentCache(() => {
			this.#cleanup = onChanged(cache)
			if (this.#disposed) this.#cleanup()
		}, REACTIVITY_DEBOUNCE)

		this.#cache = cache
		this.#cancelCache = cancelCache

		this.#observers = [
			RundownPlaylists.observe(
				{
					activationId,
				},
				cache.RundownPlaylists.link(),
				{
					projection: rundownPlaylistFieldSpecifier,
				}
			),
			ShowStyleBases.observe(showStyleBaseId, cache.ShowStyleBases.link()),
			PieceInstances.observe(
				{
					playlistActivationId: activationId,
					reset: { $ne: true },
					disabled: { $ne: true },
					reportedStoppedPlayback: { $exists: false },
					'piece.virtual': { $ne: true },
				},
				cache.PieceInstances.link(),
				{
					projection: pieceInstanceFieldSpecifier,
				}
			),
			PartInstances.observe(
				{
					playlistActivationId: activationId,
					reset: { $ne: true },
					'timings.reportedStoppedPlayback': { $ne: true },
				},
				cache.PartInstances.link(),
				{
					projection: partInstanceFieldSpecifier,
				}
			),
		]
	}

	public get cache(): ContentCache {
		return this.#cache
	}

	public stop = (): void => {
		this.#disposed = true
		this.#cancelCache()
		this.#observers.forEach((observer) => observer.stop())
		this.#cleanup?.()
	}
}
