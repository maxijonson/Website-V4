import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
    faGithub,
    faTwitch,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { app, APP_ROOT, NotFoundPage, TRCRouter } from "tchin-react-components";
import { faHome, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { HomePage, PortfolioPage } from "./pages";
import { version } from "../package.json";
import enLong from "./i18n/en/en-long.json";
import en from "./i18n/en/en.json";
import frLong from "./i18n/fr/fr-long.json";
import fr from "./i18n/fr/fr.json";
import { location } from "./config";

app.init({
    enforceSSL: true,
    routes: [
        {
            name: "header.home",
            key: "home",
            path: "/",
            exact: true,
            component: HomePage,
            Icon: () => (
                <FontAwesomeIcon
                    icon={faHome}
                    color={app.state.theme.colors.defaultText}
                />
            ),
        },
        {
            name: "header.portfolio",
            path: "/portfolio",
            key: "portfolio",
            exact: true,
            component: PortfolioPage,
            Icon: () => (
                <FontAwesomeIcon
                    icon={faBookOpen}
                    color={app.state.theme.colors.defaultText}
                />
            ),
        },
        {
            key: "notFound",
            path: "",
            component: NotFoundPage,
            hidden: true,
        },
    ],
    socials: [
        {
            name: "Twitter",
            url: "https://twitter.com/MaxiJonson",
            Icon: () => (
                <FontAwesomeIcon
                    icon={faTwitter}
                    color={app.state.theme.colors.defaultText}
                />
            ),
        },
        {
            name: "Twitch",
            url: "https://www.twitch.tv/maxijonson",
            Icon: () => (
                <FontAwesomeIcon
                    icon={faTwitch}
                    color={app.state.theme.colors.defaultText}
                />
            ),
        },
        {
            name: "Github",
            url: "https://github.com/maxijonson",
            Icon: () => (
                <FontAwesomeIcon
                    icon={faGithub}
                    color={app.state.theme.colors.defaultText}
                />
            ),
        },
    ],
    translations: {
        en: {
            ...{ long: enLong },
            ...en,
        },
        fr: {
            ...{ long: frLong },
            ...fr,
        },
    },
});

document.title = location;

ReactDOM.render(
    <Provider store={app.store}>
        <TRCRouter projectVersion={version} />
    </Provider>,
    document.getElementById(APP_ROOT)
);
