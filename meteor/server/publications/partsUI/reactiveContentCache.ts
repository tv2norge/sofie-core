import { DBPart } from '@sofie-automation/corelib/dist/dataModel/Part'
import { DBSegment } from '@sofie-automation/corelib/dist/dataModel/Segment'
import { ReactiveCacheCollection } from '../lib/ReactiveCacheCollection'
import { literal } from '@sofie-automation/corelib/dist/lib'
import { MongoFieldSpecifierOnesStrict, MongoFieldSpecifierZeroes } from '@sofie-automation/corelib/dist/mongo'
import { DBRundownPlaylist } from '@sofie-automation/corelib/dist/dataModel/RundownPlaylist'
import { DBStudio } from '@sofie-automation/corelib/dist/dataModel/Studio'

export type RundownPlaylistCompact = Pick<DBRundownPlaylist, '_id' | 'activationId' | 'quickLoop' | 'rundownIdsInOrder'>
export const rundownPlaylistFieldSpecifier = literal<MongoFieldSpecifierOnesStrict<RundownPlaylistCompact>>({
	_id: 1,
	activationId: 1,
	quickLoop: 1, // so that it invalidates when the markers or state of the loop change
	rundownIdsInOrder: 1,
})

export type SegmentFields = '_id' | '_rank' | 'rundownId'
export const segmentFieldSpecifier = literal<MongoFieldSpecifierOnesStrict<Pick<DBSegment, SegmentFields>>>({
	_id: 1,
	_rank: 1,
	rundownId: 1,
})

export type PartOmitedFields = 'privateData'
export const partFieldSpecifier = literal<MongoFieldSpecifierZeroes<Pick<DBPart, PartOmitedFields>>>({
	privateData: 0,
})

export type StudioFields = '_id' | 'settings'
export const studioFieldSpecifier = literal<MongoFieldSpecifierOnesStrict<Pick<DBStudio, StudioFields>>>({
	_id: 1,
	settings: 1,
})

export interface ContentCache {
	Studios: ReactiveCacheCollection<Pick<DBStudio, StudioFields>>
	Segments: ReactiveCacheCollection<Pick<DBSegment, SegmentFields>>
	Parts: ReactiveCacheCollection<Omit<DBPart, PartOmitedFields>>
	RundownPlaylists: ReactiveCacheCollection<RundownPlaylistCompact>
}

export function createReactiveContentCache(): ContentCache {
	const cache: ContentCache = {
		Studios: new ReactiveCacheCollection<Pick<DBStudio, StudioFields>>('rundownPlaylists'),
		Segments: new ReactiveCacheCollection<Pick<DBSegment, SegmentFields>>('segments'),
		Parts: new ReactiveCacheCollection<Omit<DBPart, PartOmitedFields>>('parts'),
		RundownPlaylists: new ReactiveCacheCollection<RundownPlaylistCompact>('rundownPlaylists'),
	}

	return cache
}
