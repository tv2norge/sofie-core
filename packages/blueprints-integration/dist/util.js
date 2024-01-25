"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateDeeplyAsync = exports.iterateDeeply = exports.iterateDeeplyEnum = exports.TMP_TSR_VERSION = void 0;
// tslint:disable-next-line:no-submodule-imports
const tsr_1 = require("@sofie-automation/shared-lib/dist/tsr");
/** @deprecated This is temporary and should be removed ASAP. Can we do it better? */
exports.TMP_TSR_VERSION = tsr_1.TSR_VERSION;
var iterateDeeplyEnum;
(function (iterateDeeplyEnum) {
    iterateDeeplyEnum["CONTINUE"] = "$continue";
})(iterateDeeplyEnum = exports.iterateDeeplyEnum || (exports.iterateDeeplyEnum = {}));
/**
 * Iterates deeply through object or array
 * @param obj the object or array to iterate through
 * @param iteratee function to apply on every attribute
 */
function iterateDeeply(
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
obj, iteratee, key) {
    const newValue = iteratee(obj, key);
    if (newValue === iterateDeeplyEnum.CONTINUE) {
        // Continue iterate deeper if possible
        if (obj && typeof obj === 'object') {
            // object or array
            if (Array.isArray(obj)) {
                obj.forEach((v, k) => {
                    obj[k] = iterateDeeply(v, iteratee, k);
                });
            }
            else {
                for (const [k, v] of Object.entries(obj)) {
                    obj[k] = iterateDeeply(v, iteratee, k);
                }
            }
        }
        else {
            // don't change anything
        }
        return obj;
    }
    else {
        return newValue;
    }
}
exports.iterateDeeply = iterateDeeply;
/**
 * Iterates deeply through object or array, using an asynchronous iteratee
 * @param obj the object or array to iterate through
 * @param iteratee function to apply on every attribute
 */
async function iterateDeeplyAsync(
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
obj, iteratee, key) {
    const newValue = await iteratee(obj, key);
    if (newValue === iterateDeeplyEnum.CONTINUE) {
        // Continue iterate deeper if possible
        if (obj && typeof obj === 'object') {
            if (Array.isArray(obj)) {
                await Promise.all(obj.map(async (v, k) => {
                    obj[k] = await iterateDeeplyAsync(v, iteratee, k);
                }));
            }
            else {
                await Promise.all(Object.entries(obj).map(async ([k, v]) => {
                    obj[k] = await iterateDeeplyAsync(v, iteratee, k);
                }));
            }
        }
        else {
            // don't change anything
        }
        return obj;
    }
    else {
        return newValue;
    }
}
exports.iterateDeeplyAsync = iterateDeeplyAsync;
//# sourceMappingURL=util.js.map