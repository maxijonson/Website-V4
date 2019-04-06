import _ from "lodash";
import { colors } from "./colors";

export type Section =
    | "pageBackground"
    | "defaultText"
    | "themeSwitchOn"
    | "themeSwitchOff"
    | "intro"
    | "introOverlay"
    | "card"
    | "altCard"
    | "defaultShadow"
    | "altDefaultShadow"
    | "cardShadow"
    | "cardSubtitle"
    | "cardFooter"
    | "defaultErrorBg"
    | "defaultErrorText"
    | "altErrorText"
    | "buttonBg"
    | "buttonText"
    | "modalBg"
    | "modalText"
    | "modalShadow"
    | "sectionBackground";
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
            themeSwitchOff: colors.normal.black,
            intro: colors.ultraDark.black,
            introOverlay: colors.light.white,
            card: colors.pitchLight.white,
            altCard: colors.veryDark.black,
            defaultShadow: colors.normal.black,
            altDefaultShadow: colors.light.white,
            cardShadow: colors.veryDark.white,
            cardSubtitle: colors.light.orange,
            cardFooter: colors.light.black,
            defaultErrorBg: colors.light.red,
            defaultErrorText: colors.veryDark.red,
            altErrorText: colors.dark.red,
            buttonBg: colors.dark.black,
            buttonText: colors.normal.white,
            modalBg: colors.veryLight.white,
            modalText: colors.normal.black,
            modalShadow: colors.normal.black,
            sectionBackground: colors.normal.white,
        },
    },
    dark: {
        name: "dark",
        colors: {
            pageBackground: colors.veryDark.onyx,
            defaultText: colors.ultraLight.white,
            themeSwitchOn: colors.normal.white,
            themeSwitchOff: colors.normal.black,
            intro: colors.normal.white,
            introOverlay: colors.ultraDark.black,
            card: colors.ultraDark.onyx,
            altCard: colors.veryLight.white,
            defaultShadow: colors.normal.white,
            altDefaultShadow: colors.light.black,
            cardShadow: colors.ultraDark.onyx,
            cardSubtitle: colors.dark.orange,
            cardFooter: colors.dark.white,
            defaultErrorBg: colors.veryDark.red,
            defaultErrorText: colors.veryLight.red,
            altErrorText: colors.light.red,
            buttonBg: colors.light.white,
            buttonText: colors.normal.black,
            modalBg: colors.veryDark.black,
            modalText: colors.normal.white,
            modalShadow: colors.veryDark.black,
            sectionBackground: colors.ultraDark.onyx,
        },
    },
};
