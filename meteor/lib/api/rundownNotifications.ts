import { TrackedNote } from '@sofie-automation/corelib/dist/dataModel/Notes'
import {
	BucketAdLibActionId,
	BucketAdLibId,
	BucketId,
	RundownId,
	RundownPlaylistId,
	SegmentId,
} from '@sofie-automation/corelib/dist/dataModel/Ids'
import { ProtectedString } from '../lib'
import { PieceContentStatusObj } from '../mediaObjects'
import { ITranslatableMessage } from '@sofie-automation/corelib/dist/TranslatableMessage'
export { UIPieceContentStatus } from '@sofie-automation/corelib/dist/dataModel/PieceContentStatus'

export type UISegmentPartNoteId = ProtectedString<'UISegmentPartNote'>
export interface UISegmentPartNote {
	_id: UISegmentPartNoteId
	playlistId: RundownPlaylistId
	rundownId: RundownId
	segmentId: SegmentId

	note: TrackedNote
}

export type UIBucketContentStatusId = ProtectedString<'UIBucketContentStatus'>
export interface UIBucketContentStatus {
	_id: UIBucketContentStatusId

	bucketId: BucketId
	docId: BucketAdLibActionId | BucketAdLibId

	name: string | ITranslatableMessage

	status: PieceContentStatusObj
}
