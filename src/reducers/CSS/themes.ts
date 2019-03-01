import moment from "moment";
import { ThemeAction } from "../../actions";
import { ITheme, themes } from "../../modules/CSS/themes";

const format = "H";
const night = {
    start: 21,
    end: 5,
};
const now = Number(moment().format(format));
const isNight = now > night.start || now < night.end;

export const themesReducerDefaultState: ITheme = isNight
    ? themes.dark
    : themes.light;

export const themesReducer = (
    state: ITheme = themesReducerDefaultState,
    action: ThemeAction,
): ITheme => {
    switch (action.type) {
        case "SET_THEME":
            return action.theme;
        case "RESET_THEME":
            return themesReducerDefaultState;
        default:
            return state;
    }
};
