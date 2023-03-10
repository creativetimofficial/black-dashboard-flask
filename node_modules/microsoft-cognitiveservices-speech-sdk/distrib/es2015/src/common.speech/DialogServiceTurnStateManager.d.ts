import { DialogServiceTurnState } from "./DialogServiceTurnState";
export declare class DialogServiceTurnStateManager {
    private privTurnMap;
    constructor();
    StartTurn(id: string): DialogServiceTurnState;
    GetTurn(id: string): DialogServiceTurnState;
    CompleteTurn(id: string): DialogServiceTurnState;
}
