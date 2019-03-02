import { DebugAction } from "src/actions";

export interface IDebugState {
    enabled: boolean;
}

export const debugReducerDefaultState: IDebugState = {
    enabled: true,
};

export const debugReducer = (
    state: IDebugState = debugReducerDefaultState,
    action: DebugAction,
): IDebugState => {
    switch (action.type) {
        case "debug/SET_ENABLED":
            return { enabled: action.enabled };
        default:
            return state;
    }
};
