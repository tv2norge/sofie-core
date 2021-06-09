import { TFunction } from 'i18next'
import moment from 'moment'
import { getCurrentTime } from '../../../lib/lib'

export function JonasFormattedTimeInner(
	t: TFunction,
	/** Timestamp to display */
	displayTimestamp: number,
	/** Timestamp of "now", if omitted, defaults to "now" */
	nowTimestamp?: number,
	/* If set, uses the time zone (in minutes) */
	timeZone?: number
) {
	let now = moment(nowTimestamp ?? getCurrentTime()) // use synced time instead of client time
	let timeToFormat = moment(displayTimestamp)

	if (timeZone !== undefined) {
		now.utcOffset(timeZone)
		timeToFormat.utcOffset(timeZone)
	}

	// Overrides to be able to display calendar based string with Moment without
	// time of day. Because we override the strings from Moment they won't be
	// automatically localized by Moment. Therefore we need to use the general
	// translation functionality for this in order for localization to work.
	// This is horrible, and hopefully will be replaced with something
	// smoother when we replace Moment.
	const momentCalendarOptions = {
		sameDay: `[${t('Today')}] HH:mm:ss`,
		lastDay: `[${t('Yesterday')}] HH:mm:ss`,
		nextDay: `[${t('Tomorrow')}] HH:mm:ss`,
		nextWeek: 'dddd HH:mm:ss',
		lastWeek: `[${t('Last')}] dddd HH:mm:ss`,
	}

	const diff = now.diff(timeToFormat, 'days')

	let formattedDateString: string
	if (Math.abs(diff) < 6) {
		formattedDateString = timeToFormat.calendar(now, momentCalendarOptions)
	} else if (now.isBefore(displayTimestamp)) {
		formattedDateString = now.from(timeToFormat)
	} else {
		formattedDateString = now.to(timeToFormat)
	}

	return formattedDateString
}
