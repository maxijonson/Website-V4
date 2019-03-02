export interface ISetDebugEnabledAction {
    type: "debug/SET_ENABLED";
    enabled: boolean;
}

export type DebugAction = ISetDebugEnabledAction;

export const setEnabled = (enabled: boolean): ISetDebugEnabledAction => ({
    enabled,
    type: "debug/SET_ENABLED",
});
