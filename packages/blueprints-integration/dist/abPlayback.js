"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AB_MEDIA_PLAYER_AUTO = void 0;
/**
 * A token to identify sessions that need an assignment, but won't be able to provide a unique id.
 * Instead, when this token is encountered, the id of the pieceInstance will be used instead of the name of the session.
 * Note: This doesnt play nice with transitions, so if they are required, then auto cannot be used
 */
exports.AB_MEDIA_PLAYER_AUTO = '__auto__';
//# sourceMappingURL=abPlayback.js.map