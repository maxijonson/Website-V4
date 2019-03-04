import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "src/i18n/en.json";
import fr from "src/i18n/fr.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        fr: {
            translation: fr,
        },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export const t = (key: string) => i18n.t(key);

export default i18n;
