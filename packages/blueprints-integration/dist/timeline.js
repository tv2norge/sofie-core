"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineObjClassesCore = exports.TimelineObjHoldMode = exports.TSR = void 0;
const tsr_1 = require("@sofie-automation/shared-lib/dist/tsr");
Object.defineProperty(exports, "TSR", { enumerable: true, get: function () { return tsr_1.TSR; } });
var Timeline_1 = require("@sofie-automation/shared-lib/dist/core/model/Timeline");
Object.defineProperty(exports, "TimelineObjHoldMode", { enumerable: true, get: function () { return Timeline_1.TimelineObjHoldMode; } });
var TimelineObjClassesCore;
(function (TimelineObjClassesCore) {
    TimelineObjClassesCore["RundownRehearsal"] = "rundown_rehersal";
    TimelineObjClassesCore["RundownActive"] = "rundown_active";
    TimelineObjClassesCore["BeforeFirstPart"] = "before_first_part";
    TimelineObjClassesCore["NoNextPart"] = "last_part";
})(TimelineObjClassesCore = exports.TimelineObjClassesCore || (exports.TimelineObjClassesCore = {}));
//# sourceMappingURL=timeline.js.map