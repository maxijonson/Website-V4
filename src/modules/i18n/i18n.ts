import i18n from "i18next";
import * as _ from "lodash";
import { initReactI18next } from "react-i18next";
import enLong from "src/i18n/en/en-long.json";
import en from "src/i18n/en/en.json";
import frLong from "src/i18n/fr/fr-long.json";
import fr from "src/i18n/fr/fr.json";

const DEFAULT_LNG = "en";

i18n.languages = [DEFAULT_LNG, "fr"];
i18n.use(initReactI18next).init({
    load: "languageOnly",
    resources: {
        en: {
            translation: {
                ...{ long: enLong },
                ...en,
            },
        },
        fr: {
            translation: {
                ...en,
                ...{ long: enLong },
                ...{ long: frLong },
                ...fr,
            },
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
