import * as actions from "src/actions";
import { CSS, Hooks, i18n, t, Utils } from "src/modules/";
import { store } from "src/store/config";
import { history } from "./routers/AppRouter";

import { themes } from "./modules/CSS";

class App {
    get state() {
        return store.getState();
    }

    get language() {
        return i18n.language;
    }

    public setTheme(theme: "light" | "dark") {
        switch (theme) {
            case "light":
                return store.dispatch(actions.setTheme(themes.light));
            case "dark":
                return store.dispatch(actions.setTheme(themes.dark));
            default:
                return console.warn(`${theme} is not a valid theme`);
        }
    }

    public setLanguage(lang: "en" | "fr") {
        if (lang !== "en" && lang !== "fr") {
            return console.warn(`${lang} is not a valid language`);
        }
        i18n.changeLanguage(lang);
    }
}

const app = new App();

(window as any).app = app;

export { store, i18n, t, CSS, Hooks, Utils, history, app };
