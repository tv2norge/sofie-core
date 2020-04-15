
import { Meteor } from 'meteor/meteor'
import { AllMeteorMethods } from '../../methods'
import { disableChecks, enableChecks as restoreChecks } from '../../../lib/check'

/** These function are used to verify that all methods defined are using security functions */


let writeAccess = false
let writeAccessTest = false
export function testWriteAccess () {
	writeAccessTest = true
}
/** Called inside access control function, to indicate that a check was made */
export function triggerWriteAccess () {
	if (writeAccessTest) {
		writeAccess = true
		throw new Meteor.Error(200, 'triggerWriteAccess')
	}
}
export function verifyWriteAccess () {
	if (!writeAccessTest) {
		return 'writeAccessTest not set!'
	}
	if (!writeAccess) {
		return 'triggerWriteAccess() not called'
	}
	writeAccess = false
	writeAccessTest = false
	return ''
}
/** Used in methods that needs no access control */
export function triggerWriteAccessBecauseNoCheckNecessary () {
	triggerWriteAccess()
}


Meteor.startup(() => {
	if (!Meteor.isProduction) {
		Meteor.setTimeout(() => {
			console.log('Security check: Verifying methods...')
			verifyAllMethods()
			// .then(() => {
			// })
			.then((ok) => {
				if (ok) {
					console.log('Security check: ok!')
				} else {
					console.log('There are security issues that needs fixing, see above!')
				}
			})
			.catch((e) => {
				console.log('Error')
				console.log(e)
			})
		}, 1000)
	}
})

async function verifyAllMethods () {
	// Verify all Meteor methods
	let ok = true
	for (let methodName of AllMeteorMethods) {

		ok = ok && verifyMethod(methodName)

		if (!ok) return false // Bail on first error

		// waitTime(100)
	}
	return ok
}
function verifyMethod (methodName: string) {
	let ok = true
	try {
		disableChecks()
		testWriteAccess()
		Meteor.call(methodName)
	} catch (e) {
		const errStr = (e.message || e) + ''
		if (errStr.match(/triggerWriteAccess/i)) {
			// silently ignore this one
		} else {
			console.log(`Unknown error when testing method "${methodName}"`, e)
			ok = false
		}
	}
	restoreChecks()
	const verifyError = verifyWriteAccess()
	if (ok && verifyError) {
		console.log(`Error when testing method "${methodName}"`, verifyError)
		ok = false
	} else {
		// ok
	}
	return ok
}
