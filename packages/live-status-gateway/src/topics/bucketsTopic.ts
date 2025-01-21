import { Logger } from 'winston'
import { WebSocket } from 'ws'
import { WebSocketTopicBase, WebSocketTopic } from '../wsHandler'
import { literal } from '@sofie-automation/corelib/dist/lib'
import { unprotectString } from '@sofie-automation/shared-lib/dist/lib/protectedString'
import _ = require('underscore')
import {
	IBlueprintActionManifestDisplayContent,
	IOutputLayer,
	ISourceLayer,
} from '@sofie-automation/blueprints-integration'
import { ShowStyleBaseExt } from '../collections/showStyleBaseHandler'
import { OutputLayers, SourceLayers } from '@sofie-automation/corelib/dist/dataModel/ShowStyleBase'
import { Bucket } from '@sofie-automation/corelib/dist/dataModel/Bucket'
import { BucketAdLibAction } from '@sofie-automation/corelib/dist/dataModel/BucketAdLibAction'
import { BucketAdLib } from '@sofie-automation/corelib/dist/dataModel/BucketAdLibPiece'
import { applyAndValidateOverrides } from '@sofie-automation/corelib/dist/settings/objectWithOverrides'
import { interpollateTranslation } from '@sofie-automation/corelib/dist/TranslatableMessage'
import { AdLibActionType, AdLibStatus } from './adLibsTopic'
import { CollectionHandlers } from '../liveStatusServer'

const THROTTLE_PERIOD_MS = 100

export interface BucketsStatus {
	event: 'buckets'
	buckets: BucketStatus[]
}

interface BucketAdLibStatus extends Omit<AdLibStatus, 'partId' | 'segmentId'> {
	externalId: string
}

export interface BucketStatus {
	id: string
	name: string
	adLibs: BucketAdLibStatus[]
}

export class BucketsTopic extends WebSocketTopicBase implements WebSocketTopic {
	public observerName = BucketsTopic.name
	private _sourceLayersMap: Map<string, string> = new Map()
	private _outputLayersMap: Map<string, string> = new Map()
	private _buckets: Bucket[] = []
	private _adLibActionsByBucket: Record<string, BucketAdLibAction[]> | undefined
	private _adLibsByBucket: Record<string, BucketAdLib[]> | undefined

	constructor(logger: Logger, handlers: CollectionHandlers) {
		super(BucketsTopic.name, logger, THROTTLE_PERIOD_MS)

		handlers.bucketsHandler.subscribe(this.onBucketsUpdate)
		handlers.bucketAdLibActionsHandler.subscribe(this.onBucketAdLibActionsUpdate)
		handlers.bucketAdLibsHandler.subscribe(this.onBucketAdLibsUpdate)
		handlers.showStyleBaseHandler.subscribe(this.onShowStyleBaseUpdate)
	}

	sendStatus(subscribers: Iterable<WebSocket>): void {
		const buckets: BucketStatus[] = this._buckets.map((bucket) => {
			const bucketId = unprotectString(bucket._id)
			const bucketAdLibs = (this._adLibsByBucket?.[bucketId] ?? []).map((adLib) => {
				const sourceLayerName = this._sourceLayersMap.get(adLib.sourceLayerId)
				const outputLayerName = this._outputLayersMap.get(adLib.outputLayerId)
				return literal<BucketAdLibStatus>({
					id: unprotectString(adLib._id),
					name: adLib.name,
					sourceLayer: sourceLayerName ?? 'invalid',
					outputLayer: outputLayerName ?? 'invalid',
					actionType: [],
					tags: adLib.tags,
					externalId: adLib.externalId,
					publicData: adLib.publicData,
				})
			})
			const bucketAdLibActions = (this._adLibActionsByBucket?.[bucketId] ?? []).map((action) => {
				const sourceLayerName = this._sourceLayersMap.get(
					(action.display as IBlueprintActionManifestDisplayContent).sourceLayerId
				)
				const outputLayerName = this._outputLayersMap.get(
					(action.display as IBlueprintActionManifestDisplayContent).outputLayerId
				)
				const triggerModes = action.triggerModes
					? action.triggerModes.map((t) =>
							literal<AdLibActionType>({
								name: t.data,
								label: interpollateTranslation(t.display.label.key, t.display.label.args),
							})
					  )
					: []
				return literal<BucketAdLibStatus>({
					id: unprotectString(action._id),
					name: interpollateTranslation(action.display.label.key, action.display.label.args),
					sourceLayer: sourceLayerName ?? 'invalid',
					outputLayer: outputLayerName ?? 'invalid',
					actionType: triggerModes,
					tags: action.display.tags,
					userData: action.userData,
					externalId: action.externalId,
					publicData: action.publicData,
				})
			})
			return {
				id: bucketId,
				name: bucket.name,
				adLibs: [...bucketAdLibs, ...bucketAdLibActions],
			}
		})

		const bucketsStatus: BucketsStatus = {
			event: 'buckets',
			buckets: buckets,
		}

		for (const subscriber of subscribers) {
			this.sendMessage(subscriber, bucketsStatus)
		}
	}

	private onShowStyleBaseUpdate = (showStyleBase: ShowStyleBaseExt | undefined): void => {
		const sourceLayers: SourceLayers = showStyleBase
			? applyAndValidateOverrides(showStyleBase.sourceLayersWithOverrides).obj
			: {}
		const outputLayers: OutputLayers = showStyleBase
			? applyAndValidateOverrides(showStyleBase.outputLayersWithOverrides).obj
			: {}
		this.logUpdateReceived(
			'showStyleBase',
			`sourceLayers [${Object.values<ISourceLayer | undefined>(sourceLayers).map(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				(s) => s!.name
			)}]`
		)
		this.logUpdateReceived(
			'showStyleBase',
			`outputLayers [${Object.values<IOutputLayer | undefined>(outputLayers).map(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				(s) => s!.name
			)}]`
		)
		this._sourceLayersMap.clear()
		this._outputLayersMap.clear()
		for (const [layerId, sourceLayer] of Object.entries<ISourceLayer | undefined>(sourceLayers)) {
			if (sourceLayer === undefined || sourceLayer === null) continue
			this._sourceLayersMap.set(layerId, sourceLayer.name)
		}
		for (const [layerId, outputLayer] of Object.entries<IOutputLayer | undefined>(outputLayers)) {
			if (outputLayer === undefined || outputLayer === null) continue
			this._outputLayersMap.set(layerId, outputLayer.name)
		}
		this.throttledSendStatusToAll()
	}

	private onBucketsUpdate = (buckets: Bucket[] | undefined): void => {
		this.logUpdateReceived('buckets')
		this._buckets = buckets ?? []
		this.throttledSendStatusToAll()
	}

	private onBucketAdLibActionsUpdate = (adLibActions: BucketAdLibAction[] | undefined): void => {
		this.logUpdateReceived('buketAdLibActions')
		this._adLibActionsByBucket = _.groupBy(adLibActions ?? [], 'bucketId')
		this.throttledSendStatusToAll()
	}

	private onBucketAdLibsUpdate = (adLibs: BucketAdLib[] | undefined): void => {
		this.logUpdateReceived('bucketAdLibs')
		this._adLibsByBucket = _.groupBy(adLibs ?? [], 'bucketId')
		this.throttledSendStatusToAll()
	}
}
