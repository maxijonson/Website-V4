import _ from "lodash";
import { colors } from "./colors";

export type Section =
    | "pageBackground"
    | "defaultText"
    | "themeSwitchOn"
    | "intro"
    | "introOverlay"
    | "card"
    | "altCard"
    | "defaultShadow"
    | "altDefaultShadow"
    | "cardShadow"
    | "cardSubtitle"
    | "cardFooter";
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
            card: colors.veryLight.white,
            altCard: colors.veryDark.black,
            defaultShadow: colors.normal.black,
            altDefaultShadow: colors.light.white,
            cardShadow: colors.light.black,
            cardSubtitle: colors.light.orange,
            cardFooter: colors.light.black,
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
            card: colors.veryDark.black,
            altCard: colors.veryLight.white,
            defaultShadow: colors.normal.white,
            altDefaultShadow: colors.light.black,
            cardShadow: colors.ultraDark.black,
            cardSubtitle: colors.dark.orange,
            cardFooter: colors.dark.white,
        },
    },
};
