// import { logger } from './logging'
// import { ConnectionOptions, Queue } from 'bullmq'

// console.log('process started') // This is a message all Sofie processes log upon startup

// logger.info('Starting ')

// console.log('hello world')

// const connection: ConnectionOptions = {
// 	// TODO - something here?
// }

// const studioId = 'studio0'

// const myQueue = new Queue(`studio:${studioId}`, {
// 	connection,
// })

// async function addJobs() {
// 	console.log('0')
// 	await myQueue.add('updateTimeline', { foo: 'bar' })
// 	console.log('1')
// 	// await myQueue.add('rundownBaselineAdLibPieceStart', {
// 	// 	playlistId: '0HVrcuJm9VWppKINIr7ba30zpKQ_',
// 	// 	partInstanceId: 'my8RZwD3d6CbqFfra',
// 	// 	baselineAdLibPieceId: 'Va08I68HQde7ScHegLBnkgEGHJQ_',
// 	// 	queue: false,
// 	// })
// 	console.log('2')
// 	// eslint-disable-next-line no-process-exit
// 	process.exit(0)
// }

// addJobs().catch((e) => console.error(e))

import { spawn, Thread, Worker } from 'threads'

void (async () => {
	const thread1 = await spawn(new Worker('./test-child'))

	setInterval(() => {
		console.log('master: tick')
	}, 1000)

	Thread.events(thread1).subscribe((event) => console.log('Thread event:', event))

	try {
		console.log('master: before')

		await thread1.doit()
	} catch (e) {
		console.log('master: it errored', e)
	}

	console.log('master: we are done')
	await Thread.terminate(thread1)
})()
