import * as _ from 'underscore'
import { setupDefaultStudioEnvironment, packageBlueprint } from '../../../../__mocks__/helpers/database'
import { testInFiber } from '../../../../__mocks__/helpers/jest'
import { literal, getRandomId, protectString } from '../../../lib/tempLib'
import { Blueprint } from '@sofie-automation/corelib/dist/dataModel/Blueprint'
import { BlueprintManifestType } from '@sofie-automation/blueprints-integration'
import { SYSTEM_ID, ICoreSystem } from '@sofie-automation/meteor-lib/dist/collections/CoreSystem'
import { insertBlueprint, uploadBlueprint } from '../api'
import { MeteorCall } from '../../methods'
import { MethodContext } from '../../methodContext'
import '../../../../__mocks__/_extendJest'
import { Blueprints, CoreSystem } from '../../../collections'
import { SupressLogMessages } from '../../../../__mocks__/suppressLogging'
import { JSONBlobStringify } from '@sofie-automation/shared-lib/dist/lib/JSONBlob'

// we don't want the deviceTriggers observer to start up at this time
jest.mock('../../deviceTriggers/observer')

require('../../peripheralDevice.ts') // include in order to create the Meteor methods needed

const DEFAULT_CONTEXT: MethodContext = {
	userId: null,
	isSimulation: false,
	connection: {
		id: 'mockConnectionId',
		close: () => undefined,
		onClose: () => undefined,
		clientAddress: '127.0.0.1',
		httpHeaders: {},
	},
	setUserId: () => undefined,
	unblock: () => undefined,
}

describe('Test blueprint management api', () => {
	beforeAll(async () => {
		await setupDefaultStudioEnvironment()
	})

	async function getCurrentBlueprintIds() {
		return _.pluck(await Blueprints.findFetchAsync({}), '_id')
	}
	async function ensureSystemBlueprint() {
		const existingBp = await Blueprints.findOneAsync({ blueprintType: BlueprintManifestType.SYSTEM })
		if (existingBp) {
			return existingBp
		} else {
			const blueprint: Blueprint = {
				_id: getRandomId(),
				name: 'Fake blueprint',
				organizationId: null,
				hasCode: true,
				code: `({default: (() => 5)()})`,
				created: 0,
				modified: 0,

				blueprintId: '',
				blueprintType: BlueprintManifestType.SYSTEM,
				blueprintHash: getRandomId(),

				studioConfigSchema: JSONBlobStringify({}),
				showStyleConfigSchema: JSONBlobStringify({}),

				databaseVersion: {
					showStyle: {},
					studio: {},
					system: undefined,
				},

				blueprintVersion: '',
				integrationVersion: '',
				TSRVersion: '',
				hasFixUpFunction: false,
			}
			await Blueprints.insertAsync(blueprint)
			return blueprint
		}
	}

	describe('assignSystemBlueprint', () => {
		async function getActiveSystemBlueprintId() {
			const core = (await CoreSystem.findOneAsync(SYSTEM_ID)) as ICoreSystem
			expect(core).toBeTruthy()
			return core.blueprintId
		}

		testInFiber('empty id', async () => {
			const initialBlueprintId = await getActiveSystemBlueprintId()

			SupressLogMessages.suppressLogMessage(/Blueprint not found/i)
			await expect(MeteorCall.blueprint.assignSystemBlueprint(protectString(''))).rejects.toThrowMeteor(
				404,
				'Blueprint not found'
			)

			expect(await getActiveSystemBlueprintId()).toEqual(initialBlueprintId)
		})
		testInFiber('unknown id', async () => {
			const blueprint = await ensureSystemBlueprint()
			const initialBlueprintId = await getActiveSystemBlueprintId()

			SupressLogMessages.suppressLogMessage(/Blueprint not found/i)
			await expect(
				MeteorCall.blueprint.assignSystemBlueprint(protectString(blueprint._id + '_no'))
			).rejects.toThrowMeteor(404, 'Blueprint not found')

			expect(await getActiveSystemBlueprintId()).toEqual(initialBlueprintId)
		})
		testInFiber('good', async () => {
			const blueprint = await ensureSystemBlueprint()

			// Ensure starts off 'wrong'
			expect(await getActiveSystemBlueprintId()).not.toEqual(blueprint._id)

			await MeteorCall.blueprint.assignSystemBlueprint(blueprint._id)

			// Ensure ends up good
			expect(await getActiveSystemBlueprintId()).toEqual(blueprint._id)
		})
		testInFiber('unassign', async () => {
			// Ensure starts off 'wrong'
			expect(await getActiveSystemBlueprintId()).toBeTruthy()

			await MeteorCall.blueprint.assignSystemBlueprint()

			// Ensure ends up good
			expect(await getActiveSystemBlueprintId()).toBeFalsy()
		})
		testInFiber('wrong type', async () => {
			const blueprint = (await Blueprints.findOneAsync({
				blueprintType: BlueprintManifestType.SHOWSTYLE,
			})) as Blueprint
			expect(blueprint).toBeTruthy()

			// Ensure starts off 'wrong'
			const initialBlueprintId = await getActiveSystemBlueprintId()
			expect(initialBlueprintId).not.toEqual(blueprint._id)

			SupressLogMessages.suppressLogMessage(/Blueprint not of type SYSTEM/i)
			await expect(MeteorCall.blueprint.assignSystemBlueprint(blueprint._id)).rejects.toThrowMeteor(
				404,
				'Blueprint not of type SYSTEM'
			)

			// Ensure ends up good
			expect(await getActiveSystemBlueprintId()).toEqual(initialBlueprintId)
		})
	})

	describe('removeBlueprint', () => {
		testInFiber('undefined id', async () => {
			SupressLogMessages.suppressLogMessage(/Match error/i)
			await expect(MeteorCall.blueprint.removeBlueprint(undefined as any)).rejects.toThrow(
				'Match error: Expected string, got undefined'
			)
		})

		testInFiber('empty id', async () => {
			SupressLogMessages.suppressLogMessage(/Blueprint id/i)
			await expect(MeteorCall.blueprint.removeBlueprint(protectString(''))).rejects.toThrowMeteor(
				404,
				'Blueprint id "" was not found'
			)
		})
		testInFiber('missing id', async () => {
			// Should not error
			await MeteorCall.blueprint.removeBlueprint(protectString('not_a_real_blueprint'))
		})
		testInFiber('good', async () => {
			const blueprint = await ensureSystemBlueprint()
			expect(await Blueprints.findOneAsync(blueprint._id)).toBeTruthy()

			await MeteorCall.blueprint.removeBlueprint(blueprint._id)

			expect(await Blueprints.findOneAsync(blueprint._id)).toBeFalsy()
		})
	})

	describe('insertBlueprint', () => {
		testInFiber('no params', async () => {
			const initialBlueprints = await getCurrentBlueprintIds()

			const newId = await MeteorCall.blueprint.insertBlueprint()
			expect(newId).toBeTruthy()

			const finalBlueprints = await getCurrentBlueprintIds()
			expect(finalBlueprints).toContain(newId)

			expect(finalBlueprints).toEqual(initialBlueprints.concat(newId))

			// Check some props
			const blueprint = (await Blueprints.findOneAsync(newId)) as Blueprint
			expect(blueprint).toBeTruthy()
			expect(blueprint.name).toBeTruthy()
			expect(blueprint.blueprintType).toBeFalsy()
		})
		testInFiber('with name', async () => {
			const rawName = 'some_fake_name'
			const newId = await insertBlueprint(DEFAULT_CONTEXT, undefined, rawName)
			expect(newId).toBeTruthy()

			// Check some props
			const blueprint = (await Blueprints.findOneAsync(newId)) as Blueprint
			expect(blueprint).toBeTruthy()
			expect(blueprint.name).toEqual(rawName)
			expect(blueprint.blueprintType).toBeFalsy()
		})
		testInFiber('with type', async () => {
			const type = BlueprintManifestType.STUDIO
			const newId = await insertBlueprint(DEFAULT_CONTEXT, type)
			expect(newId).toBeTruthy()

			// Check some props
			const blueprint = (await Blueprints.findOneAsync(newId)) as Blueprint
			expect(blueprint).toBeTruthy()
			expect(blueprint.name).toBeTruthy()
			expect(blueprint.blueprintType).toEqual(type)
		})
	})

	describe('uploadBlueprint', () => {
		testInFiber('empty id', async () => {
			await expect(uploadBlueprint(DEFAULT_CONTEXT, protectString(''), '0')).rejects.toThrowMeteor(
				400,
				'Blueprint id "" is not valid'
			)
		})
		testInFiber('empty body', async () => {
			await expect(uploadBlueprint(DEFAULT_CONTEXT, protectString('blueprint99'), '')).rejects.toThrowMeteor(
				400,
				'Blueprint blueprint99 failed to parse'
			)
		})
		testInFiber('body not a manifest', async () => {
			await expect(
				uploadBlueprint(DEFAULT_CONTEXT, protectString('blueprint99'), `({default: (() => 5)()})`)
			).rejects.toThrowMeteor(400, 'Blueprint blueprint99 returned a manifest of type number')
		})
		testInFiber('manifest missing blueprintType', async () => {
			const blueprintStr = packageBlueprint({}, () => {
				return {
					blueprintType: undefined as any,
					blueprintVersion: '0.0.0',
					integrationVersion: '0.0.0',
					TSRVersion: '0.0.0',

					// studioConfigManifest: [],
					// studioMigrations: [],
					// getBaseline: (context: IStudioContext): TSRTimelineObjBase[] => {
					// 	return []
					// },
					// getShowStyleId: (context: IStudioConfigContext, showStyles: Array<IBlueprintShowStyleBase>, ingestRundown: IngestRundown): string | null => {
					// 	return showStyles[0]._id
					// }
				}
			})
			await expect(
				uploadBlueprint(DEFAULT_CONTEXT, protectString('blueprint99'), blueprintStr)
			).rejects.toThrowMeteor(
				400,
				`Blueprint blueprint99 returned a manifest of unknown blueprintType "undefined"`
			)
		})
		testInFiber('replace existing with different type', async () => {
			const BLUEPRINT_TYPE = BlueprintManifestType.STUDIO
			const blueprintStr = packageBlueprint(
				{
					BLUEPRINT_TYPE,
				},
				() => {
					return {
						blueprintType: BLUEPRINT_TYPE,
						blueprintVersion: '0.0.0',
						integrationVersion: '0.0.0',
						TSRVersion: '0.0.0',
					}
				}
			)

			const existingBlueprint = (await Blueprints.findOneAsync({
				blueprintType: BlueprintManifestType.SHOWSTYLE,
			})) as Blueprint
			expect(existingBlueprint).toBeTruthy()

			await expect(uploadBlueprint(DEFAULT_CONTEXT, existingBlueprint._id, blueprintStr)).rejects.toThrowMeteor(
				400,
				`Cannot replace old blueprint (of type "showstyle") with new blueprint of type "studio"`
			)
		})
		testInFiber('success - showstyle', async () => {
			const BLUEPRINT_TYPE = BlueprintManifestType.SHOWSTYLE
			const blueprintStr = packageBlueprint(
				{
					BLUEPRINT_TYPE,
				},
				() => {
					return {
						blueprintId: 'ss1',
						blueprintType: BLUEPRINT_TYPE,
						blueprintVersion: '0.1.0',
						integrationVersion: '0.2.0',
						TSRVersion: '0.3.0',
						showStyleConfigSchema: JSON.stringify({ show1: true }) as any,
						studioConfigSchema: JSON.stringify({ studio1: true }) as any,
					}
				}
			)

			const blueprint = await uploadBlueprint(DEFAULT_CONTEXT, protectString('tmp_showstyle'), blueprintStr)
			expect(blueprint).toBeTruthy()
			expect(blueprint).toMatchObject(
				literal<Omit<Blueprint, 'created' | 'modified' | 'databaseVersion' | 'blueprintHash'>>({
					_id: protectString('tmp_showstyle'),
					name: 'tmp_showstyle',
					organizationId: null,
					blueprintType: BLUEPRINT_TYPE,
					blueprintId: 'ss1',
					blueprintVersion: '0.1.0',
					integrationVersion: '0.2.0',
					TSRVersion: '0.3.0',
					showStyleConfigSchema: JSON.stringify({ show1: true }) as any,
					hasCode: !!blueprintStr,
					code: blueprintStr,
					hasFixUpFunction: false,
				})
			)
			expect(blueprint.studioConfigSchema).toBeUndefined()
		})
		testInFiber('success - studio', async () => {
			const BLUEPRINT_TYPE = BlueprintManifestType.STUDIO
			const blueprintStr = packageBlueprint(
				{
					BLUEPRINT_TYPE,
				},
				() => {
					return {
						blueprintType: BLUEPRINT_TYPE,
						blueprintVersion: '0.1.0',
						integrationVersion: '0.2.0',
						TSRVersion: '0.3.0',
						showStyleConfigSchema: JSON.stringify({ show1: true }) as any,
						studioConfigSchema: JSON.stringify({ studio1: true }) as any,
					}
				}
			)

			const blueprint = await uploadBlueprint(
				DEFAULT_CONTEXT,
				protectString('tmp_studio'),
				blueprintStr,
				'tmp name'
			)
			expect(blueprint).toBeTruthy()
			expect(blueprint).toMatchObject(
				literal<Omit<Blueprint, 'created' | 'modified' | 'databaseVersion' | 'blueprintHash'>>({
					_id: protectString('tmp_studio'),
					name: 'tmp name',
					organizationId: null,
					blueprintId: '',
					blueprintType: BLUEPRINT_TYPE,
					blueprintVersion: '0.1.0',
					integrationVersion: '0.2.0',
					TSRVersion: '0.3.0',
					studioConfigSchema: JSONBlobStringify({ studio1: true } as any),
					hasCode: !!blueprintStr,
					code: blueprintStr,
					hasFixUpFunction: false,
				})
			)
			expect(blueprint.showStyleConfigSchema).toBeUndefined()
		})
		testInFiber('success - system', async () => {
			const BLUEPRINT_TYPE = BlueprintManifestType.SYSTEM
			const blueprintStr = packageBlueprint(
				{
					BLUEPRINT_TYPE,
				},
				() => {
					return {
						blueprintId: 'sys',
						blueprintType: BLUEPRINT_TYPE,
						blueprintVersion: '0.1.0',
						integrationVersion: '0.2.0',
						TSRVersion: '0.3.0',
						showStyleConfigSchema: JSON.stringify({ show1: true }) as any,
						studioConfigSchema: JSON.stringify({ studio1: true }) as any,
					}
				}
			)

			const blueprint = await uploadBlueprint(
				DEFAULT_CONTEXT,
				protectString('tmp_system'),
				blueprintStr,
				'tmp name'
			)
			expect(blueprint).toBeTruthy()
			expect(blueprint).toMatchObject(
				literal<Omit<Blueprint, 'created' | 'modified' | 'databaseVersion' | 'blueprintHash'>>({
					_id: protectString('tmp_system'),
					name: 'tmp name',
					organizationId: null,
					blueprintId: 'sys',
					blueprintType: BLUEPRINT_TYPE,
					blueprintVersion: '0.1.0',
					integrationVersion: '0.2.0',
					TSRVersion: '0.3.0',
					hasCode: !!blueprintStr,
					code: blueprintStr,
					hasFixUpFunction: false,
				})
			)
			expect(blueprint.showStyleConfigSchema).toBeUndefined()
			expect(blueprint.studioConfigSchema).toBeUndefined()
		})
		testInFiber('update - studio', async () => {
			const BLUEPRINT_TYPE = BlueprintManifestType.STUDIO
			const blueprintStr = packageBlueprint(
				{
					BLUEPRINT_TYPE,
				},
				() => {
					return {
						blueprintType: BLUEPRINT_TYPE,
						blueprintVersion: '0.1.0',
						integrationVersion: '0.2.0',
						TSRVersion: '0.3.0',
						showStyleConfigSchema: JSON.stringify({ show1: true }) as any,
						studioConfigSchema: JSON.stringify({ studio1: true }) as any,
					}
				}
			)

			const existingBlueprint = (await Blueprints.findOneAsync({
				blueprintType: BlueprintManifestType.STUDIO,
			})) as Blueprint
			expect(existingBlueprint).toBeTruthy()
			expect(existingBlueprint.blueprintId).toBeFalsy()

			const blueprint = await uploadBlueprint(DEFAULT_CONTEXT, existingBlueprint._id, blueprintStr)
			expect(blueprint).toBeTruthy()
			expect(blueprint).toMatchObject(
				literal<Omit<Blueprint, 'created' | 'modified' | 'databaseVersion' | 'blueprintHash'>>({
					_id: existingBlueprint._id,
					name: existingBlueprint.name,
					organizationId: null,
					blueprintId: '',
					blueprintType: BLUEPRINT_TYPE,
					blueprintVersion: '0.1.0',
					integrationVersion: '0.2.0',
					TSRVersion: '0.3.0',
					studioConfigSchema: JSONBlobStringify({ studio1: true } as any),
					hasCode: !!blueprintStr,
					code: blueprintStr,
					hasFixUpFunction: false,
				})
			)
			expect(blueprint.showStyleConfigSchema).toBeUndefined()
		})
		testInFiber('update - matching blueprintId', async () => {
			const BLUEPRINT_TYPE = BlueprintManifestType.SHOWSTYLE
			const blueprintStr = packageBlueprint(
				{
					BLUEPRINT_TYPE,
				},
				() => {
					return {
						blueprintId: 'ss1',
						blueprintType: BLUEPRINT_TYPE,
						blueprintVersion: '0.1.0',
						integrationVersion: '0.2.0',
						TSRVersion: '0.3.0',
						showStyleConfigSchema: JSON.stringify({ show1: true }) as any,
						studioConfigSchema: JSON.stringify({ studio1: true }) as any,
					}
				}
			)

			const existingBlueprint = (await Blueprints.findOneAsync({
				blueprintType: BlueprintManifestType.SHOWSTYLE,
				blueprintId: 'ss1',
			})) as Blueprint
			expect(existingBlueprint).toBeTruthy()
			expect(existingBlueprint.blueprintId).toBeTruthy()

			const blueprint = await uploadBlueprint(DEFAULT_CONTEXT, existingBlueprint._id, blueprintStr)
			expect(blueprint).toBeTruthy()
			expect(blueprint).toMatchObject(
				literal<Omit<Blueprint, 'created' | 'modified' | 'databaseVersion' | 'blueprintHash'>>({
					_id: existingBlueprint._id,
					name: existingBlueprint.name,
					organizationId: null,
					blueprintId: 'ss1',
					blueprintType: BLUEPRINT_TYPE,
					blueprintVersion: '0.1.0',
					integrationVersion: '0.2.0',
					TSRVersion: '0.3.0',
					showStyleConfigSchema: JSONBlobStringify({ show1: true } as any),
					hasCode: !!blueprintStr,
					code: blueprintStr,
					hasFixUpFunction: false,
				})
			)
			expect(blueprint.studioConfigSchema).toBeUndefined()
		})
		testInFiber('update - change blueprintId', async () => {
			const BLUEPRINT_TYPE = BlueprintManifestType.SHOWSTYLE
			const blueprintStr = packageBlueprint(
				{
					BLUEPRINT_TYPE,
				},
				() => {
					return {
						blueprintId: 'show2',
						blueprintType: BLUEPRINT_TYPE,
						blueprintVersion: '0.1.0',
						integrationVersion: '0.2.0',
						TSRVersion: '0.3.0',
						showStyleConfigSchema: JSON.stringify({ show1: true }) as any,
						studioConfigSchema: JSON.stringify({ studio1: true }) as any,
					}
				}
			)

			const existingBlueprint = (await Blueprints.findOneAsync({
				blueprintType: BlueprintManifestType.SHOWSTYLE,
				blueprintId: 'ss1',
			})) as Blueprint
			expect(existingBlueprint).toBeTruthy()
			expect(existingBlueprint.blueprintId).toBeTruthy()

			await expect(uploadBlueprint(DEFAULT_CONTEXT, existingBlueprint._id, blueprintStr)).rejects.toThrowMeteor(
				422,
				`Cannot replace old blueprint "${existingBlueprint._id}" ("ss1") with new blueprint "show2"`
			)
		})
		testInFiber('update - drop blueprintId', async () => {
			const BLUEPRINT_TYPE = BlueprintManifestType.SHOWSTYLE
			const blueprintStr = packageBlueprint(
				{
					BLUEPRINT_TYPE,
				},
				() => {
					return {
						blueprintType: BLUEPRINT_TYPE,
						blueprintVersion: '0.1.0',
						integrationVersion: '0.2.0',
						TSRVersion: '0.3.0',
						showStyleConfigSchema: JSON.stringify({ show1: true }) as any,
						studioConfigSchema: JSON.stringify({ studio1: true }) as any,
					}
				}
			)

			const existingBlueprint = (await Blueprints.findOneAsync({
				blueprintType: BlueprintManifestType.SHOWSTYLE,
				blueprintId: 'ss1',
			})) as Blueprint
			expect(existingBlueprint).toBeTruthy()
			expect(existingBlueprint.blueprintId).toBeTruthy()

			await expect(uploadBlueprint(DEFAULT_CONTEXT, existingBlueprint._id, blueprintStr)).rejects.toThrowMeteor(
				422,
				`Cannot replace old blueprint "${existingBlueprint._id}" ("ss1") with new blueprint ""`
			)
		})
	})
})
