import { ITheme } from "src/modules/CSS/themes";

export interface ISetThemeAction {
    type: "SET_THEME";
    theme: ITheme;
}

export interface IResetThemeAction {
    type: "RESET_THEME";
}

export type ThemeAction = ISetThemeAction | IResetThemeAction;

export const setTheme = (theme: ITheme): ISetThemeAction => ({
    theme,
    type: "SET_THEME",
});

export const resetTheme = (): IResetThemeAction => ({
    type: "RESET_THEME",
});
