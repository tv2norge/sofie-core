import * as MOS from 'mos-connection'
import { logger } from '../../../logging'
import { Rundown } from '../../../../lib/collections/Rundowns'
import { Meteor } from 'meteor/meteor'
import { PeripheralDevice, PeripheralDevices } from '../../../../lib/collections/PeripheralDevices'
import { PeripheralDeviceAPI } from '../../../../lib/api/peripheralDevice'
import { Piece } from '../../../../lib/collections/Pieces'
import { IngestPart } from '@sofie-automation/blueprints-integration'
import { parseMosString } from './lib'
import { waitForPromise, WrapAsyncCallback } from '../../../../lib/lib'
import * as _ from 'underscore'
import { TriggerReloadDataResponse } from '../../../../lib/api/userActions'
import { runIngestOperation } from '../lib'
import { IngestJobs } from '@sofie-automation/corelib/dist/worker/ingest'

export namespace MOSDeviceActions {
	export const reloadRundown: (peripheralDevice: PeripheralDevice, rundown: Rundown) => TriggerReloadDataResponse =
		Meteor.wrapAsync(function reloadRundown(
			peripheralDevice: PeripheralDevice,
			rundown: Rundown,
			cb: WrapAsyncCallback<TriggerReloadDataResponse>
		): void {
			logger.info('reloadRundown ' + rundown._id)

			PeripheralDeviceAPI.executeFunctionWithCustomTimeout(
				peripheralDevice._id,
				(err: Error, mosRunningOrder: MOS.IMOSRunningOrder) => {
					if (err) {
						if (_.isString(err) && err.match(/rundown does not exist/i)) {
							// Don't throw an error, instead return MISSING value
							cb(null, TriggerReloadDataResponse.MISSING)
						} else {
							logger.error('Error in MOSDeviceActions.reloadRundown', err)
							cb(err)
						}
					} else {
						try {
							logger.info('triggerGetRunningOrder reply ' + mosRunningOrder.ID)
							logger.debug(mosRunningOrder)

							if (parseMosString(mosRunningOrder.ID) !== rundown.externalId) {
								throw new Meteor.Error(
									401,
									`Expected triggerGetRunningOrder reply for ${
										rundown.externalId
									} but got ${parseMosString(mosRunningOrder.ID)}`
								)
							}

							waitForPromise(
								runIngestOperation(rundown.studioId, IngestJobs.MosRundown, {
									rundownExternalId: rundown.externalId,
									peripheralDeviceId: peripheralDevice._id,
									mosRunningOrder: mosRunningOrder,
									isCreateAction: false,
								})
							)

							// Since the Reload reply is asynchronously followed by ROFullStories, the reload is technically not completed at this point
							cb(null, TriggerReloadDataResponse.WORKING)
						} catch (e) {
							cb(e)
						}
					}
				},
				10 * 1000, // 10 seconds, sometimes the NRCS is pretty slow in returning a response
				'triggerGetRunningOrder',
				rundown.externalId
			)
		})

	export async function setPieceInOutPoint(
		rundown: Rundown,
		piece: Piece,
		partCache: IngestPart,
		inPoint: number,
		duration: number
	): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!partCache.payload)
				throw new Meteor.Error(500, `Part Cache for "${partCache.externalId}" missing payload!`)
			const mosPayload = partCache.payload as MOS.IMOSROFullStory
			if (!mosPayload.Body)
				throw new Meteor.Error(500, `Part Cache for "${partCache.externalId}" missing FullStory content!`)

			const story = mosPayload.Body.filter(
				(item) => item.Type === 'storyItem' && item.Content.ID === piece.externalId
			)[0].Content
			const timeBase = story.TimeBase || 1
			const modifiedFields = {
				EditorialStart: (inPoint * timeBase) as number | undefined,
				EditorialDuration: duration * timeBase,
				TimeBase: timeBase,
			}
			Object.assign(story, modifiedFields)

			// ENPS will doesn't send a 0-length EditorialStart, instead it just ommits it from the object
			if (modifiedFields.EditorialStart === 0) {
				modifiedFields.EditorialStart = undefined
			}

			const peripheralDevice = PeripheralDevices.findOne(rundown.peripheralDeviceId)
			if (!peripheralDevice)
				throw new Meteor.Error(404, 'PeripheralDevice "' + rundown.peripheralDeviceId + '" not found')

			PeripheralDeviceAPI.executeFunctionWithCustomTimeout(
				peripheralDevice._id,
				(err: any, response: any) => {
					// console.debug(`Received response from device: ${JSON.stringify(err)}, ${JSON.stringify(response)}`)
					if (err) reject(err)
					else if (response && response.mos && response.mos.roAck && response.mos.roAck.roStatus !== 'OK')
						reject(response)
					else resolve()
					// we need a very long timeout to make sure we receive notification from the device
				},
				120 * 1000,
				'replaceStoryItem',
				mosPayload.RunningOrderId,
				mosPayload.ID,
				story,
				modifiedFields
			)
		})
	}
}
