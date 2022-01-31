import * as MOS from 'mos-connection'
import { logger } from '../../../logging'
import { Rundown } from '../../../../lib/collections/Rundowns'
import { Meteor } from 'meteor/meteor'
import { PeripheralDevice, PeripheralDevices, PeripheralDeviceId } from '../../../../lib/collections/PeripheralDevices'
import { PeripheralDeviceAPI } from '../../../../lib/api/peripheralDevice'
import { handleMosRundownData } from './ingest'
import { Piece } from '../../../../lib/collections/Pieces'
import { IngestPart } from '@sofie-automation/blueprints-integration'
import { parseMosString } from './lib'
import { stringifyError, waitForPromise } from '../../../../lib/lib'
import * as _ from 'underscore'
import { TriggerReloadDataResponse } from '../../../../lib/api/userActions'

export namespace MOSDeviceActions {
	export async function reloadRundown(
		peripheralDevice: PeripheralDevice,
		rundown: Rundown
	): Promise<TriggerReloadDataResponse> {
		logger.info('reloadRundown ' + rundown._id)

		try {
			const mosRunningOrder: MOS.IMOSRunningOrder = await PeripheralDeviceAPI.executeFunctionWithCustomTimeout(
				peripheralDevice._id,
				10 * 1000, // 10 seconds, sometimes the NRCS is pretty slow in returning a response
				'triggerGetRunningOrder',
				rundown.externalId
			)

			logger.info('triggerGetRunningOrder reply ' + mosRunningOrder.ID)
			logger.debug(mosRunningOrder)

			if (parseMosString(mosRunningOrder.ID) !== rundown.externalId) {
				throw new Meteor.Error(
					401,
					`Expected triggerGetRunningOrder reply for ${rundown.externalId} but got ${parseMosString(
						mosRunningOrder.ID
					)}`
				)
			}

			await handleMosRundownData(peripheralDevice, mosRunningOrder, false)

			// Since the Reload reply is asynchronously followed by ROFullStories, the reload is technically not completed at this point
			return TriggerReloadDataResponse.WORKING
		} catch (err) {
			if (_.isString(err) && err.match(/rundown does not exist/i)) {
				// Don't throw an error, instead return MISSING value
				return TriggerReloadDataResponse.MISSING
			} else {
				logger.error(`Error in MOSDeviceActions.reloadRundown: ${stringifyError(err)}`)
				throw err
			}
		}
	}
	export function notifyCurrentPlayingPart(
		peripheralDevice: PeripheralDevice,
		rundown: Rundown,
		oldPlayingPartExternalId: string | null,
		newPlayingPartExternalId: string | null
	) {
		if (oldPlayingPartExternalId !== newPlayingPartExternalId) {
			// Note: We send the PLAY first, since that seems to give us _slightly_ better responsiveness in ENPS.

			if (newPlayingPartExternalId) {
				try {
					waitForPromise(
						setStoryStatus(
							peripheralDevice._id,
							rundown,
							newPlayingPartExternalId,
							MOS.IMOSObjectStatus.PLAY
						)
					)
				} catch (error) {
					logger.error('Error in setStoryStatus PLAY', error)
				}
			}
			if (oldPlayingPartExternalId) {
				try {
					waitForPromise(
						setStoryStatus(
							peripheralDevice._id,
							rundown,
							oldPlayingPartExternalId,
							MOS.IMOSObjectStatus.STOP
						)
					)
				} catch (error) {
					logger.error('Error in setStoryStatus STOP', error)
				}
			}
		}
	}
	async function setStoryStatus(
		deviceId: PeripheralDeviceId,
		rundown: Rundown,
		storyId: string,
		status: MOS.IMOSObjectStatus
	): Promise<any> {
		logger.debug('setStoryStatus', { deviceId, externalId: rundown.externalId, storyId, status })
		return PeripheralDeviceAPI.executeFunction(deviceId, 'setStoryStatus', rundown.externalId, storyId, status)
	}

	export async function setPieceInOutPoint(
		rundown: Rundown,
		piece: Piece,
		partCache: IngestPart,
		inPoint: number,
		duration: number
	): Promise<void> {
		if (!partCache.payload) throw new Meteor.Error(500, `Part Cache for "${partCache.externalId}" missing payload!`)
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

		await PeripheralDeviceAPI.executeFunctionWithCustomTimeout(
			peripheralDevice._id,
			// we need a very long timeout to make sure we receive notification from the device
			120 * 1000,
			'replaceStoryItem',
			mosPayload.RunningOrderId,
			mosPayload.ID,
			story,
			modifiedFields
		).then((response) => {
			// If the response was a failed write, then reject
			if (response && response.mos && response.mos.roAck && response.mos.roAck.roStatus !== 'OK')
				return Promise.reject(response)
		})
	}
}
