import _ from "lodash";
import { colors } from "./colors";

export type Section =
    | "pageBackground"
    | "defaultText"
    | "themeSwitchOn"
    | "intro"
    | "introOverlay";
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
            defaultText: colors.ultraDark.black,
            themeSwitchOn: colors.normal.white,
            intro: colors.ultraDark.black,
            introOverlay: colors.light.white,
        },
    },
    dark: {
        name: "dark",
        colors: {
            pageBackground: colors.ultraDark.white,
            defaultText: colors.ultraLight.white,
            themeSwitchOn: colors.normal.white,
            intro: colors.normal.white,
            introOverlay: colors.ultraDark.black,
        },
    },
};
