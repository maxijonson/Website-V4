import _ from "lodash";
import { colors } from "./colors";

export type Section =
    | "pageBackground"
    | "defaultText"
    | "themeSwitchOn"
    | "intro"
    | "introOverlay"
    | "sectionCard"
    | "altSectionCard"
    | "defaultShadow"
    | "altDefaultShadow"
    | "sectionCardShadow"
    | "sectionSubtitle"
    | "sectionFooter";
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
            sectionCard: colors.veryLight.white,
            altSectionCard: colors.veryDark.black,
            defaultShadow: colors.normal.black,
            altDefaultShadow: colors.light.white,
            sectionCardShadow: colors.light.black,
            sectionSubtitle: colors.light.orange,
            sectionFooter: colors.light.black,
        },
    },
    dark: {
        name: "dark",
        colors: {
            pageBackground: colors.veryDark.black,
            defaultText: colors.ultraLight.white,
            themeSwitchOn: colors.normal.white,
            intro: colors.normal.white,
            introOverlay: colors.ultraDark.black,
            sectionCard: colors.veryDark.black,
            altSectionCard: colors.veryLight.white,
            defaultShadow: colors.normal.white,
            altDefaultShadow: colors.light.black,
            sectionCardShadow: colors.ultraDark.black,
            sectionSubtitle: colors.dark.orange,
            sectionFooter: colors.dark.white,
        },
    },
};
