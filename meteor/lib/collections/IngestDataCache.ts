import { TransformedCollection } from '../typings/meteor'
import { registerCollection, ProtectedString } from '../lib'
import { IngestRundown, IngestSegment, IngestPart, IngestPlaylist } from '@sofie-automation/blueprints-integration'
import { createMongoCollection } from './lib'
import { RundownId } from './Rundowns'
import { SegmentId } from './Segments'
import { PartId } from './Parts'
import { registerIndex } from '../database'
import { RundownPlaylistId } from './RundownPlaylists'

export enum IngestCacheType {
	RUNDOWN = 'rundown',
	SEGMENT = 'segment',
	PART = 'part',
	PLAYLIST = 'playlist',
}
export type IngestCacheData = IngestPlaylist | IngestRundown | IngestSegment | IngestPart

/** A string, identifying a IngestDataCacheObj */
export type IngestDataCacheObjId = ProtectedString<'IngestDataCacheObjId'>

export interface IngestDataCacheObjBase {
	_id: IngestDataCacheObjId
	modified: number
	type: IngestCacheType

	playlistId: RundownPlaylistId

	data: IngestCacheData
}

export interface IngestDataCacheObjRundownPlaylist extends IngestDataCacheObjBase {
	type: IngestCacheType.PLAYLIST
	data: IngestPlaylist
}
export interface IngestDataCacheObjRundown extends IngestDataCacheObjBase {
	type: IngestCacheType.RUNDOWN
	rundownId: RundownId
	data: IngestRundown
}
export interface IngestDataCacheObjSegment extends IngestDataCacheObjBase {
	type: IngestCacheType.SEGMENT
	rundownId: RundownId
	segmentId: SegmentId

	data: IngestSegment
}
export interface IngestDataCacheObjPart extends IngestDataCacheObjBase {
	type: IngestCacheType.PART
	rundownId: RundownId
	segmentId: SegmentId
	partId: PartId
	data: IngestPart
}
export type IngestDataCacheObj =
	| IngestDataCacheObjRundownPlaylist
	| IngestDataCacheObjRundown
	| IngestDataCacheObjSegment
	| IngestDataCacheObjPart

export const IngestDataCache: TransformedCollection<IngestDataCacheObj, IngestDataCacheObj> = createMongoCollection<
	IngestDataCacheObj
>('ingestDataCache')
registerCollection('IngestDataCache', IngestDataCache)

registerIndex(IngestDataCache, {
	rundownId: 1,
})
