import * as _ from 'underscore'
import { Meteor } from 'meteor/meteor'
import { saveIntoDb, getCurrentTime, protectString, unprotectString } from '../../../lib/lib'
import { IngestRundown, IngestSegment, IngestPart, IngestPlaylist } from '@sofie-automation/blueprints-integration'
import {
	IngestDataCacheObj,
	IngestDataCache,
	IngestCacheType,
	IngestDataCacheObjPart,
	IngestDataCacheObjRundown,
	IngestDataCacheObjSegment,
	IngestDataCacheObjId,
	IngestDataCacheObjRundownPlaylist,
} from '../../../lib/collections/IngestDataCache'
import { getSegmentId, getPartId, getRundownId } from './lib'
import { logger } from '../../../lib/logging'
import { RundownId } from '../../../lib/collections/Rundowns'
import { SegmentId } from '../../../lib/collections/Segments'
import { PartId } from '../../../lib/collections/Parts'
import { profiler } from '../profiler'
import { RundownPlaylistId } from '../../../lib/collections/RundownPlaylists'
import { Studio } from '../../../lib/collections/Studios'

export function loadCachedRundownPlaylistData(
	playlistId: RundownPlaylistId,
	playlistExternalId: string
): LocalIngestPlaylist {
	const span = profiler.startSpan('ingest.ingestCache.loadCachedRundownPlaylistData')

	const cacheEntries = IngestDataCache.find({ playlistId: playlistId }).fetch()

	const cachedPlaylist = cacheEntries.find((e) => e.type === IngestCacheType.PLAYLIST)
	if (!cachedPlaylist)
		throw new Meteor.Error(404, `Playlist "${playlistId}", (${playlistExternalId}) has no cached ingest data`)

	const ingestPlaylist = cachedPlaylist.data as LocalIngestPlaylist
	ingestPlaylist.modified = cachedPlaylist.modified

	const cachedRundowns = cacheEntries.filter(
		(entry) => entry.type === IngestCacheType.RUNDOWN
	) as IngestDataCacheObjRundown[]
	const rundownsMap = _.groupBy(cachedRundowns, (e) => e.rundownId)
	_.each(rundownsMap, (objs) => {
		const rundownEntry = objs.find((e) => e.type === IngestCacheType.RUNDOWN)
		if (rundownEntry) {
			const ingestRundown = loadCachedRundownData(rundownEntry.rundownId, rundownEntry.data.externalId)
			ingestPlaylist.rundowns.push(ingestRundown)
		}
	})

	ingestPlaylist.rundowns.sort((a, b) => {
		if (a._rank === undefined && b._rank === undefined) return 0
		if (a._rank === undefined) return -1
		if (b._rank === undefined) return 1

		return a._rank - b._rank
	})

	span?.end()
	return ingestPlaylist
}
export function loadCachedRundownData(rundownId: RundownId, rundownExternalId: string): LocalIngestRundown {
	const span = profiler.startSpan('ingest.ingestCache.loadCachedRundownData')

	const cacheEntries = IngestDataCache.find({ rundownId: rundownId }).fetch()

	const cachedRundown = cacheEntries.find((e) => e.type === IngestCacheType.RUNDOWN)
	if (!cachedRundown)
		throw new Meteor.Error(404, `Rundown "${rundownId}", (${rundownExternalId}) has no cached ingest data`)

	const ingestRundown = cachedRundown.data as LocalIngestRundown
	ingestRundown.modified = cachedRundown.modified

	const cachedSegmentsAndParts = cacheEntries.filter(
		(entry) => entry.type === IngestCacheType.SEGMENT || entry.type === IngestCacheType.PART
	) as Array<IngestDataCacheObjSegment | IngestDataCacheObjPart>
	const segmentMap = _.groupBy(cachedSegmentsAndParts, (e) => e.segmentId)
	_.each(segmentMap, (objs) => {
		const segmentEntry = objs.find((e) => e.type === IngestCacheType.SEGMENT)
		if (segmentEntry) {
			const ingestSegment = segmentEntry.data as LocalIngestSegment
			ingestSegment.modified = segmentEntry.modified

			_.each(objs, (entry) => {
				if (entry.type === IngestCacheType.PART) {
					const ingestPart = entry.data as LocalIngestPart
					ingestPart.modified = entry.modified

					ingestSegment.parts.push(ingestPart)
				}
			})

			ingestSegment.parts = _.sortBy(ingestSegment.parts, (s) => s.rank)
			ingestRundown.segments.push(ingestSegment)
		}
	})

	ingestRundown.segments = _.sortBy(ingestRundown.segments, (s) => s.rank)

	span?.end()
	return ingestRundown
}
export function loadCachedIngestSegment(
	rundownId: RundownId,
	rundownExternalId: string,
	segmentId: SegmentId,
	segmentExternalId?: string
): LocalIngestSegment {
	const cacheEntries = IngestDataCache.find({
		rundownId: rundownId,
		segmentId: segmentId,
	}).fetch()

	const segmentEntries = cacheEntries.filter((e) => e.type === IngestCacheType.SEGMENT)
	if (segmentEntries.length > 1)
		logger.warn(
			`There are multiple segments (${
				cacheEntries.length
			}) in IngestDataCache for rundownId: "${rundownExternalId}", segmentId: "${segmentExternalId || segmentId}"`
		)

	const segmentEntry = segmentEntries[0]
	if (!segmentEntry)
		throw new Meteor.Error(
			404,
			`Segment "${segmentExternalId ||
				segmentId}" in rundown "${rundownExternalId}" is missing cached ingest data`
		)
	if (segmentEntry.type !== IngestCacheType.SEGMENT) throw new Meteor.Error(500, 'Wrong type on cached segment')

	const ingestSegment = segmentEntry.data as LocalIngestSegment
	ingestSegment.modified = segmentEntry.modified

	_.each(cacheEntries, (entry) => {
		if (entry.type === IngestCacheType.PART) {
			const ingestPart = entry.data as LocalIngestPart
			ingestPart.modified = entry.modified

			ingestSegment.parts.push(ingestPart)
		}
	})

	ingestSegment.parts = _.sortBy(ingestSegment.parts, (s) => s.rank)

	return ingestSegment
}
export function loadIngestDataCachePart(
	rundownId: RundownId,
	rundownExternalId: string,
	partId: PartId,
	partExternalId: string
): IngestDataCacheObjPart {
	const cacheEntries = IngestDataCache.find({
		rundownId: rundownId,
		partId: partId,
		type: IngestCacheType.PART,
	}).fetch()
	if (cacheEntries.length > 1)
		logger.warn(
			`There are multiple parts (${cacheEntries.length}) in IngestDataCache for rundownId: "${rundownExternalId}", partId: "${partExternalId}"`
		)

	const partEntry = cacheEntries[0]
	if (!partEntry)
		throw new Meteor.Error(
			404,
			`Part "${partExternalId}" in rundown "${rundownExternalId}" is missing cached ingest data`
		)
	if (partEntry.type !== IngestCacheType.PART) throw new Meteor.Error(500, 'Wrong type on cached part')
	return partEntry
}

export function savePlaylistCacahe(studio: Studio, playlistId: RundownPlaylistId, ingestPlaylist: LocalIngestPlaylist) {
	const cacheEntries: IngestDataCacheObj[] = generateCacheForRundownPlaylist(studio, playlistId, ingestPlaylist)
	saveIntoDb<IngestDataCacheObj, IngestDataCacheObj>(
		IngestDataCache,
		{
			playlistId: playlistId,
		},
		cacheEntries
	)
}
export function saveRundownCache(
	rundownPlaylistId: RundownPlaylistId,
	rundownId: RundownId,
	ingestRundown: LocalIngestRundown
) {
	// cache the Data:
	const cacheEntries: IngestDataCacheObj[] = generateCacheForRundown(rundownPlaylistId, rundownId, ingestRundown)
	saveIntoDb<IngestDataCacheObj, IngestDataCacheObj>(
		IngestDataCache,
		{
			rundownId: rundownId,
		},
		cacheEntries
	)
}
export function saveSegmentCache(
	playlistId: RundownPlaylistId,
	rundownId: RundownId,
	segmentId: SegmentId,
	ingestSegment: LocalIngestSegment
) {
	const span = profiler.startSpan('ingest.ingestCache.saveSegmentCache')

	// cache the Data:
	const cacheEntries: IngestDataCacheObj[] = generateCacheForSegment(playlistId, rundownId, ingestSegment)
	saveIntoDb<IngestDataCacheObj, IngestDataCacheObj>(
		IngestDataCache,
		{
			rundownId: rundownId,
			segmentId: segmentId,
		},
		cacheEntries
	)

	span?.end()
}
interface LocalIngestBase {
	modified: number
}
export interface LocalIngestPlaylist extends IngestPlaylist, LocalIngestBase {
	rundowns: LocalIngestRundown[]
}
export interface LocalIngestRundown extends IngestRundown, LocalIngestBase {
	segments: LocalIngestSegment[]
}
export interface LocalIngestSegment extends IngestSegment, LocalIngestBase {
	parts: LocalIngestPart[]
}
export interface LocalIngestPart extends IngestPart, LocalIngestBase {}
export function isLocalIngestRundownPlaylist(o: IngestPlaylist | LocalIngestPlaylist): o is LocalIngestPlaylist {
	return !!o['modified']
}
export function isLocalIngestRundown(o: IngestRundown | LocalIngestRundown): o is LocalIngestRundown {
	return !!o['modified']
}
export function makeNewIngestRundownPlaylist(ingestPlaylist: IngestPlaylist): LocalIngestPlaylist {
	return {
		...ingestPlaylist,
		rundowns: _.map(ingestPlaylist.rundowns, makeNewIngestRundown),
		modified: getCurrentTime(),
	}
}
export function makeNewIngestRundown(ingestRundown: IngestRundown): LocalIngestRundown {
	return {
		...ingestRundown,
		segments: _.map(ingestRundown.segments, makeNewIngestSegment),
		modified: getCurrentTime(),
	}
}
export function makeNewIngestSegment(ingestSegment: IngestSegment): LocalIngestSegment {
	return {
		...ingestSegment,
		parts: _.map(ingestSegment.parts, makeNewIngestPart),
		modified: getCurrentTime(),
	}
}
export function makeNewIngestPart(ingestPart: IngestPart): LocalIngestPart {
	return { ...ingestPart, modified: getCurrentTime() }
}

export function updateIngestRundownWithData(
	oldIngestRundown: LocalIngestRundown,
	newIngestSegments: LocalIngestSegment[]
): LocalIngestRundown {
	const newIngestRundown = _.clone(oldIngestRundown) as LocalIngestRundown
	newIngestRundown.segments = newIngestSegments as LocalIngestSegment[]
	_.each(newIngestRundown.segments, (newIngestSegment) => {
		const oldIngestSegment = oldIngestRundown.segments.find((s) => s.externalId === newIngestSegment.externalId)
		if (oldIngestSegment) {
			newIngestSegment.modified = Math.max(newIngestSegment.modified, oldIngestSegment.modified)
		} else {
			newIngestSegment.modified = getCurrentTime()
		}
	})
	return newIngestRundown
}

function generateCacheForRundownPlaylist(
	studio: Studio,
	playlistId: RundownPlaylistId,
	ingestPlaylist: LocalIngestPlaylist
): IngestDataCacheObj[] {
	const cacheEntries: IngestDataCacheObj[] = []
	const playlist: IngestDataCacheObjRundownPlaylist = {
		_id: protectString<IngestDataCacheObjId>(unprotectString(playlistId)),
		type: IngestCacheType.PLAYLIST,
		playlistId,
		modified: ingestPlaylist.modified,
		data: {
			..._.omit(ingestPlaylist, 'modified'),
			rundowns: [],
		},
	}
	cacheEntries.push(playlist)
	_.each(ingestPlaylist.rundowns, (rundown) =>
		cacheEntries.push(...generateCacheForRundown(playlistId, getRundownId(studio, rundown.externalId), rundown))
	)
	return cacheEntries
}
function generateCacheForRundown(
	playlistId: RundownPlaylistId,
	rundownId: RundownId,
	ingestRundown: LocalIngestRundown
): IngestDataCacheObj[] {
	// cache the Data
	const cacheEntries: IngestDataCacheObj[] = []
	const rundown: IngestDataCacheObjRundown = {
		_id: protectString<IngestDataCacheObjId>(unprotectString(rundownId)),
		type: IngestCacheType.RUNDOWN,
		rundownId,
		playlistId: playlistId,
		modified: ingestRundown.modified,
		data: {
			..._.omit(ingestRundown, 'modified'),
			segments: [], // omit the segments, they come as separate objects
		},
	}
	cacheEntries.push(rundown)
	_.each(ingestRundown.segments, (segment) =>
		cacheEntries.push(...generateCacheForSegment(playlistId, rundownId, segment))
	)
	return cacheEntries
}
function generateCacheForSegment(
	playlistId: RundownPlaylistId,
	rundownId: RundownId,
	ingestSegment: LocalIngestSegment
): IngestDataCacheObj[] {
	const segmentId = getSegmentId(rundownId, ingestSegment.externalId)
	const cacheEntries: Array<IngestDataCacheObjSegment | IngestDataCacheObjPart> = []

	const segment: IngestDataCacheObjSegment = {
		_id: protectString<IngestDataCacheObjId>(`${rundownId}_${segmentId}`),
		type: IngestCacheType.SEGMENT,
		playlistId,
		rundownId: rundownId,
		segmentId: segmentId,
		modified: ingestSegment.modified,
		data: {
			..._.omit(ingestSegment, 'modified'),
			parts: [], // omit the parts, they come as separate objects
		},
	}
	cacheEntries.push(segment)

	_.each(ingestSegment.parts, (part) => {
		cacheEntries.push(generateCacheForPart(playlistId, rundownId, segmentId, part))
	})

	return cacheEntries
}
function generateCacheForPart(
	playlistId: RundownPlaylistId,
	rundownId: RundownId,
	segmentId: SegmentId,
	part: LocalIngestPart
): IngestDataCacheObjPart {
	const partId = getPartId(rundownId, part.externalId)
	return {
		_id: protectString<IngestDataCacheObjId>(`${rundownId}_${partId}`),
		type: IngestCacheType.PART,
		playlistId,
		rundownId: rundownId,
		segmentId: segmentId,
		partId: partId,
		modified: part.modified,
		data: _.omit(part, 'modified'),
	}
}
