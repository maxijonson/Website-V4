import i18n from "i18next";
import * as _ from "lodash";
import { initReactI18next } from "react-i18next";
import en from "src/i18n/en.json";
import fr from "src/i18n/fr.json";

const DEFAULT_LNG = "en";

i18n.languages = ["en", "fr"];
i18n.use(initReactI18next).init({
    load: "languageOnly",
    resources: {
        en: {
            translation: en,
        },
        fr: {
            translation: fr,
        },
    },
    lng: (() => {
        for (const lng of i18n.languages) {
            if (_.includes(navigator.language, lng)) {
                return lng;
            }
        }
        return DEFAULT_LNG;
    })(),
    fallbackLng: DEFAULT_LNG,
    interpolation: {
        escapeValue: false,
    },
});
export const t = (key: string) => i18n.t(key);
export default i18n;
