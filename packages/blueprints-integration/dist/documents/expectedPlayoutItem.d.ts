import type { TSR } from '../timeline';
/** @deprecated */
export interface ExpectedPlayoutItemGeneric {
    /** What type of playout device this item should be handled by */
    deviceSubType: TSR.DeviceType;
    /** Which playout device this item should be handled by */
    /** Content of the expectedPlayoutItem */
    content: TSR.ExpectedPlayoutItemContent;
}
type ExpectedPlayoutItemContent = TSR.ExpectedPlayoutItemContent;
export { ExpectedPlayoutItemContent };
//# sourceMappingURL=expectedPlayoutItem.d.ts.map