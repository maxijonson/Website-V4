import _ from "lodash";
import { colors, IColors } from "./colors";
import { shade } from "./shades";

export interface ITheme {
    name: string;
    colors: IColors;
}

export type IThemes = { [name in shade]: ITheme };

export const themes: IThemes = {
    dark: { name: "Dark", colors: colors.dark },
    light: { name: "Light", colors: colors.light },
    normal: { name: "Normal", colors: colors.normal },
    ultraDark: { name: "Ultra Dark", colors: colors.ultraDark },
    ultraLight: { name: "Ultra Light", colors: colors.ultraLight },
    veryDark: { name: "Very Dark", colors: colors.veryDark },
    veryLight: { name: "Very Light", colors: colors.veryLight },
};
