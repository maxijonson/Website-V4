import moment from "moment";
import { ThemeAction } from "src/actions";
import { ITheme, themes } from "src/modules/CSS";

const format = "H";
const night = {
    start: 19,
    end: 5,
};
const now = Number(moment().format(format));
const isNight = now > night.start || now < night.end;

export const themesReducerDefaultState: ITheme = isNight ? themes.dark : themes.light;

export const themesReducer = (state: ITheme = themesReducerDefaultState, action: ThemeAction): ITheme => {
    switch (action.type) {
        case "themes/SET_THEME":
            return action.theme;
        case "themes/RESET_THEME":
            return themesReducerDefaultState;
        default:
            return state;
    }
};
