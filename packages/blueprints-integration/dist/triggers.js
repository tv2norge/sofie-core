"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayoutActions = exports.ClientActions = exports.TriggerType = void 0;
const ShowStyle_1 = require("@sofie-automation/shared-lib/dist/core/model/ShowStyle");
Object.defineProperty(exports, "ClientActions", { enumerable: true, get: function () { return ShowStyle_1.ClientActions; } });
Object.defineProperty(exports, "PlayoutActions", { enumerable: true, get: function () { return ShowStyle_1.PlayoutActions; } });
var TriggerType;
(function (TriggerType) {
    TriggerType["hotkey"] = "hotkey";
    TriggerType["device"] = "device";
})(TriggerType = exports.TriggerType || (exports.TriggerType = {}));
//# sourceMappingURL=triggers.js.map