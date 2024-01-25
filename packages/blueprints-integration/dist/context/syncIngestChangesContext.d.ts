import type { IRundownUserContext } from './rundownContext';
import type { IBlueprintMutatablePart, IBlueprintPartInstance, IBlueprintPiece, IBlueprintPieceInstance } from '../documents';
export interface ISyncIngestUpdateToPartInstanceContext extends IRundownUserContext {
    /** Sync a pieceInstance. Inserts the pieceInstance if new, updates if existing. Optionally pass in a mutated Piece, to override the content of the instance */
    syncPieceInstance(pieceInstanceId: string, mutatedPiece?: Omit<IBlueprintPiece, 'lifespan'>): IBlueprintPieceInstance;
    /** Insert a pieceInstance. Returns id of new PieceInstance. Any timelineObjects will have their ids changed, so are not safe to reference from another piece */
    insertPieceInstance(piece: IBlueprintPiece): IBlueprintPieceInstance;
    /** Update a pieceInstance */
    updatePieceInstance(pieceInstanceId: string, piece: Partial<IBlueprintPiece>): IBlueprintPieceInstance;
    /** Remove a pieceInstance */
    removePieceInstances(...pieceInstanceIds: string[]): string[];
    /** Update a partInstance */
    updatePartInstance(props: Partial<IBlueprintMutatablePart>): IBlueprintPartInstance;
    /** Remove the partInstance. This is only valid when `playstatus: 'next'` */
    removePartInstance(): void;
}
//# sourceMappingURL=syncIngestChangesContext.d.ts.map