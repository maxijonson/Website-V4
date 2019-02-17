import _ from "lodash";
import { colors } from "./colors";

export type Section = "pageBackground" | "headerLink" | "themeSwitchOn";
export type Theme = "light" | "dark";

export type IPalette = { [name in Section]: string };

export interface ITheme {
    name: Theme;
    colors: IPalette;
}

export type IThemes = { [name in Theme]: ITheme };

export const themes: IThemes = {
    light: {
        name: "light",
        colors: {
            pageBackground: colors.light.white,
            headerLink: colors.ultraDark.black,
            themeSwitchOn: colors.normal.white,
        },
    },
    dark: {
        name: "dark",
        colors: {
            pageBackground: colors.ultraDark.white,
            headerLink: colors.ultraLight.white,
            themeSwitchOn: colors.normal.white,
        },
    },
};
