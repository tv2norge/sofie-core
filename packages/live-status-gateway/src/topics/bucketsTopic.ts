import { Logger } from 'winston'
import { WebSocket } from 'ws'
import { WebSocketTopicBase, WebSocketTopic, CollectionObserver } from '../wsHandler'
import { literal } from '@sofie-automation/corelib/dist/lib'
import { unprotectString } from '@sofie-automation/shared-lib/dist/lib/protectedString'
import _ = require('underscore')
import {
	IBlueprintActionManifestDisplayContent,
	IOutputLayer,
	ISourceLayer,
} from '@sofie-automation/blueprints-integration'
import { ShowStyleBaseHandler } from '../collections/showStyleBaseHandler'
import { DBShowStyleBase, OutputLayers, SourceLayers } from '@sofie-automation/corelib/dist/dataModel/ShowStyleBase'
import { Bucket } from '@sofie-automation/corelib/dist/dataModel/Bucket'
import { BucketAdLibAction } from '@sofie-automation/corelib/dist/dataModel/BucketAdLibAction'
import { BucketAdLib } from '@sofie-automation/corelib/dist/dataModel/BucketAdLibPiece'
import { applyAndValidateOverrides } from '@sofie-automation/corelib/dist/settings/objectWithOverrides'
import { interpollateTranslation } from '@sofie-automation/corelib/dist/TranslatableMessage'
import { AdLibActionType, AdLibStatus } from './adLibsTopic'
import { BucketAdLibActionsHandler } from '../collections/bucketAdLibActionsHandler'
import { BucketAdLibsHandler } from '../collections/bucketAdLibsHandler'
import { BucketsHandler } from '../collections/bucketsHandler'

const THROTTLE_PERIOD_MS = 100

export interface BucketsStatus {
	event: 'buckets'
	buckets: BucketStatus[]
}

type BucketAdLibStatus = AdLibStatus

export interface BucketStatus {
	id: string
	name: string
	adLibs: BucketAdLibStatus[]
}

export class BucketsTopic
	extends WebSocketTopicBase
	implements
		WebSocketTopic,
		CollectionObserver<Bucket[]>,
		CollectionObserver<BucketAdLibAction[]>,
		CollectionObserver<BucketAdLib[]>,
		CollectionObserver<DBShowStyleBase>
{
	public observerName = BucketsTopic.name
	private _sourceLayersMap: Map<string, string> = new Map()
	private _outputLayersMap: Map<string, string> = new Map()
	private _buckets: Bucket[] = []
	private _adLibActionsByBucket: Record<string, BucketAdLibAction[]> | undefined
	private _adLibsByBucket: Record<string, BucketAdLib[]> | undefined
	private throttledSendStatusToAll: () => void

	constructor(logger: Logger) {
		super(BucketsTopic.name, logger)
		this.throttledSendStatusToAll = _.throttle(this.sendStatusToAll.bind(this), THROTTLE_PERIOD_MS, {
			leading: true,
			trailing: true,
		})
	}

	addSubscriber(ws: WebSocket): void {
		super.addSubscriber(ws)
		this.sendStatus([ws])
	}

	sendStatus(subscribers: Iterable<WebSocket>): void {
		const buckets: BucketStatus[] = this._buckets.map((bucket) => {
			const bucketId = unprotectString(bucket._id)
			const bucketAdLibs = (this._adLibsByBucket?.[bucketId] ?? []).map((adLib) => {
				const sourceLayerName = this._sourceLayersMap.get(adLib.sourceLayerId)
				const outputLayerName = this._outputLayersMap.get(adLib.outputLayerId)
				return literal<AdLibStatus>({
					id: unprotectString(adLib._id),
					name: adLib.name,
					sourceLayer: sourceLayerName ?? 'invalid',
					outputLayer: outputLayerName ?? 'invalid',
					actionType: [],
					tags: adLib.tags,
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
				return literal<AdLibStatus>({
					id: unprotectString(action._id),
					name: interpollateTranslation(action.display.label.key, action.display.label.args),
					sourceLayer: sourceLayerName ?? 'invalid',
					outputLayer: outputLayerName ?? 'invalid',
					actionType: triggerModes,
					tags: action.display.tags,
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

	async update(
		source: string,
		data: Bucket[] | BucketAdLibAction[] | BucketAdLib[] | DBShowStyleBase | undefined
	): Promise<void> {
		switch (source) {
			case BucketsHandler.name: {
				const buckets = data ? (data as Bucket[]) : []
				this._logger.info(`${this._name} received buckets update from ${source}`)
				this._buckets = buckets
				break
			}
			case BucketAdLibActionsHandler.name: {
				const adLibActions = data ? (data as BucketAdLibAction[]) : []
				this._logger.info(`${this._name} received adLibActions update from ${source}`)
				this._adLibActionsByBucket = _.groupBy(adLibActions, 'bucketId')
				break
			}
			case BucketAdLibsHandler.name: {
				const adLibs = data ? (data as BucketAdLib[]) : []
				this._logger.info(`${this._name} received adLibs update from ${source}`)
				this._adLibsByBucket = _.groupBy(adLibs, 'bucketId')
				break
			}
			case ShowStyleBaseHandler.name: {
				const sourceLayers: SourceLayers = data
					? applyAndValidateOverrides((data as DBShowStyleBase).sourceLayersWithOverrides).obj
					: {}
				const outputLayers: OutputLayers = data
					? applyAndValidateOverrides((data as DBShowStyleBase).outputLayersWithOverrides).obj
					: {}
				this._logger.info(
					`${this._name} received showStyleBase update with sourceLayers [${Object.values<
						ISourceLayer | undefined
					>(sourceLayers).map(
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						(s) => s!.name
					)}]`
				)
				this._logger.info(
					`${this._name} received showStyleBase update with outputLayers [${Object.values<
						IOutputLayer | undefined
					>(outputLayers).map(
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
				break
			}
			default:
				throw new Error(`${this._name} received unsupported update from ${source}}`)
		}

		this.throttledSendStatusToAll()
	}

	private sendStatusToAll() {
		this.sendStatus(this._subscribers)
	}
}
