import { JobContext } from '../jobs'
import { CacheForStudio } from './cache'

/**
 * Run a typical studio job
 * This means loading the studio cache, doing some calculations and saving the result
 */
export async function runAsStudioJob<TRes>(
	context: JobContext,
	fcn: (cache: CacheForStudio) => Promise<TRes>
): Promise<TRes> {
	const cache = await CacheForStudio.create(context)

	const res = await fcn(cache)

	await cache.saveAllToDatabase()

	return res
}
