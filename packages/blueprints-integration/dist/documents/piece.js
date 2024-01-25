"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IBlueprintPieceType = void 0;
/** Special types of pieces. Some are not always used in all circumstances */
var IBlueprintPieceType;
(function (IBlueprintPieceType) {
    IBlueprintPieceType["Normal"] = "normal";
    /** ***CAUTION!*** This Piece will only be used, if the Part containing it has the inTransition property set */
    IBlueprintPieceType["InTransition"] = "in-transition";
    /** ***CAUTION!*** This Piece will only be used, if the Part containing it has the outTransition property set */
    IBlueprintPieceType["OutTransition"] = "out-transition";
})(IBlueprintPieceType = exports.IBlueprintPieceType || (exports.IBlueprintPieceType = {}));
//# sourceMappingURL=piece.js.map