import { PackageInfo } from '@sofie-automation/blueprints-integration'

export interface ScanInfoForPackages {
	[packageId: string]: ScanInfoForPackage
}
export interface ScanInfoForPackage {
	/** Display name of the package  */
	packageName: string
	scan?: PackageInfo.FFProbeScan['payload']
	deepScan?: PackageInfo.FFProbeDeepScan['payload']
	timebase?: number // derived from scan
}

export { PieceContentStatusObj } from '@sofie-automation/corelib/dist/dataModel/PieceContentStatus'
