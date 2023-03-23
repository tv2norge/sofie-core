/* eslint-disable jest/no-export, jest/valid-title, jest/expect-expect, jest/no-focused-tests */
import { runInFiber } from '../meteor'

export function beforeAllInFiber(fcn: () => void | Promise<void>, timeout?: number): void {
	beforeAll(async () => {
		await runInFiber(fcn)
	}, timeout)
}
export function afterAllInFiber(fcn: () => void | Promise<void>, timeout?: number): void {
	afterAll(async () => {
		await runInFiber(fcn)
	}, timeout)
}
export function beforeEachInFiber(fcn: () => void | Promise<void>, timeout?: number): void {
	beforeEach(async () => {
		await runInFiber(fcn)
	}, timeout)
}
export function afterEachInFiber(fcn: () => void | Promise<void>, timeout?: number): void {
	afterEach(async () => {
		await runInFiber(fcn)
	}, timeout)
}

export function testInFiber(testName: string, fcn: () => void | Promise<void>, timeout?: number): void {
	test(
		testName,
		async () => {
			await runInFiber(fcn)
		},
		timeout
	)
}

export function testInFiberOnly(testName: string, fcn: () => void | Promise<void>, timeout?: number): void {
	// eslint-disable-next-line custom-rules/no-focused-test
	test.only(
		testName,
		async () => {
			await runInFiber(fcn)
		},
		timeout
	)
}
const orgSetTimeout = setTimeout
export async function runAllTimers(): Promise<void> {
	// Run all timers, and wait, multiple times.
	// This is to allow timers AND internal promises to resolve in inner functions
	for (let i = 0; i < 50; i++) {
		jest.runOnlyPendingTimers()
		await new Promise((resolve) => orgSetTimeout(resolve, 0))
	}
}

export async function runTimersUntilNow(): Promise<void> {
	// Run all timers, and wait, multiple times.
	// This is to allow timers AND internal promises to resolve in inner functions
	for (let i = 0; i < 50; i++) {
		jest.advanceTimersByTime(0)
		await new Promise((resolve) => orgSetTimeout(resolve, 0))
	}
}

/** Returns a Promise that resolves after a speficied number of milliseconds */
export async function waitTime(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
/**
 * Executes {expectFcn} intermittently until it doesn't throw anymore.
 * Waits up to {maxWaitTime} ms, then throws the latest error.
 * Useful in unit-tests as a way to wait until a predicate is fulfilled.
 * Example usage:
 * ```
 * const myArray = []
 * asynchoronouslyPopulateArray(myArray)
 * await waitUntil(() => {
 *   expect(myArray).toHaveLength(42)
 * }, 500)
 * ```
 */
export async function waitUntil(expectFcn: () => void, maxWaitTime: number): Promise<void> {
	/** How often to check expectFcn() */
	const iterateInterval = maxWaitTime < 100 ? 10 : 100

	const startTime = Date.now()
	// eslint-disable-next-line no-constant-condition
	while (true) {
		await waitTime(iterateInterval)
		try {
			expectFcn()
			return
		} catch (err) {
			const waitedTime = Date.now() - startTime
			if (waitedTime > maxWaitTime) throw err
			// else ignore error and try again later
		}
	}
}

// testInFiber.only = testInFiberOnly
