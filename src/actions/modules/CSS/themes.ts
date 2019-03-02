import { ITheme } from "src/modules/CSS/themes";

export interface ISetThemeAction {
    type: "themes/SET_THEME";
    theme: ITheme;
}

export interface IResetThemeAction {
    type: "themes/RESET_THEME";
}

export type ThemeAction = ISetThemeAction | IResetThemeAction;

export const setTheme = (theme: ITheme): ISetThemeAction => ({
    theme,
    type: "themes/SET_THEME",
});

export const resetTheme = (): IResetThemeAction => ({
    type: "themes/RESET_THEME",
});
