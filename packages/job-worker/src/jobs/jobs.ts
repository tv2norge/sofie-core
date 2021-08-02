import { CacheForPlayout, runAsPlayoutJob, runInPlaylistLock } from '../playout/cache'
import { updateTimeline, updateStudioTimeline } from '../playout/timeline'
import { CacheForStudio } from '../studio/cache'
import { JobContext } from '.'
import { adLibPieceStart, startStickyPieceOnSourceLayer, takePieceAsAdlibNow } from '../playout/adlib'
import { StudioJobs, StudioJobFunc } from '@sofie-automation/corelib/dist/worker/studio'
import { lockPlaylist } from './lock'
import {
	activateHold,
	activateRundownPlaylist,
	deactivateHold,
	deactivateRundownPlaylist,
	disableNextPiece,
	executeAction,
	moveNextPart,
	onPartPlaybackStarted,
	onPartPlaybackStopped,
	onPiecePlaybackStarted,
	onPiecePlaybackStopped,
	prepareRundownPlaylistForBroadcast,
	resetRundownPlaylist,
	setNextPart,
	setNextSegment,
	stopPiecesOnSourceLayers,
	takeNextPart,
} from '../playout/playout'
import { runAsStudioJob } from '../studio/lock'

type ExecutableFunction<T extends keyof StudioJobFunc> = (
	context: JobContext,
	data: Parameters<StudioJobFunc[T]>[0]
) => Promise<ReturnType<StudioJobFunc[T]>>

export type StudioJobHandlers = {
	[T in keyof StudioJobFunc]: ExecutableFunction<T>
}

export const studioJobHandlers: StudioJobHandlers = {
	[StudioJobs.UpdateTimeline]: updateTimelineDebug,
	[StudioJobs.AdlibPieceStart]: adLibPieceStart,
	[StudioJobs.TakePieceAsAdlibNow]: takePieceAsAdlibNow,
	[StudioJobs.StartStickyPieceOnSourceLayer]: startStickyPieceOnSourceLayer,
	[StudioJobs.StopPiecesOnSourceLayers]: stopPiecesOnSourceLayers,
	[StudioJobs.MoveNextPart]: moveNextPart,
	[StudioJobs.ActivateHold]: activateHold,
	[StudioJobs.DeactivateHold]: deactivateHold,
	[StudioJobs.PrepareRundownForBroadcast]: prepareRundownPlaylistForBroadcast,
	[StudioJobs.ResetRundownPlaylist]: resetRundownPlaylist,
	[StudioJobs.ActivateRundownPlaylist]: activateRundownPlaylist,
	[StudioJobs.DeactivateRundownPlaylist]: deactivateRundownPlaylist,
	[StudioJobs.SetNextPart]: setNextPart,
	[StudioJobs.SetNextSegment]: setNextSegment,
	[StudioJobs.ExecuteAction]: executeAction,
	[StudioJobs.TakeNextPart]: takeNextPart,
	[StudioJobs.OnPiecePlaybackStarted]: onPiecePlaybackStarted,
	[StudioJobs.OnPiecePlaybackStopped]: onPiecePlaybackStopped,
	[StudioJobs.OnPartPlaybackStarted]: onPartPlaybackStarted,
	[StudioJobs.OnPartPlaybackStopped]: onPartPlaybackStopped,
	[StudioJobs.DisableNextPiece]: disableNextPiece,
}

async function updateTimelineDebug(context: JobContext, _data: void): Promise<void> {
	console.log('running updateTimelineDebug')
	await runAsStudioJob(context, async (studioCache) => {
		const activePlaylists = studioCache.getActiveRundownPlaylists()
		if (activePlaylists.length > 1) {
			throw new Error(`Too many active playlists`)
		} else if (activePlaylists.length > 0) {
			studioCache._abortActiveTimeout() // no changes have been made or should be kept

			const playlist = activePlaylists[0]
			console.log('for playlist', playlist._id)

			await runAsPlayoutJob(context, { playlistId: playlist._id }, null, async (playoutCache) => {
				await updateTimeline(context, playoutCache)
			})
		} else {
			console.log('for studio')
			await updateStudioTimeline(context, studioCache)
			await studioCache.saveAllToDatabase()
		}
	})
	console.log('done')
}
