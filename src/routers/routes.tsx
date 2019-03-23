import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { ConnectedComponentClass } from "react-redux";
import { store } from "src/app";
import { HomePage, NotFoundPage } from "../pages";

export interface IRoute {
    name: string;
    key: string;
    component: ConnectedComponentClass<any, any> | (() => JSX.Element | null);
    hidden?: boolean;
    path: string;
    exact?: boolean;
    Icon: () => JSX.Element;
}

export const routes: IRoute[] = [
    {
        name: "header.home",
        key: "home",
        path: "/",
        exact: true,
        component: HomePage,
        Icon: () => (
            <FontAwesomeIcon
                icon="home"
                color={store.getState().theme.colors.defaultText}
            />
        ),
    },
    {
        name: "header.portfolio",
        path: "/portfolio",
        key: "portfolio",
        exact: true,
        component: HomePage,
        Icon: () => (
            <FontAwesomeIcon
                icon="book-open"
                color={store.getState().theme.colors.defaultText}
            />
        ),
    },
    {
        name: "Intellibot",
        path: "/intellibot",
        key: "intellibot",
        exact: true,
        component: () => {
            window.location.href = "/intellibot";
            return null;
        },
        Icon: () => (
            <FontAwesomeIcon
                icon={faDiscord}
                color={store.getState().theme.colors.defaultText}
            />
        ),
    },
    {
        name: "Not Found",
        key: "notFound",
        path: "",
        component: NotFoundPage,
        hidden: true,
        Icon: () => <span>NF</span>, // Should not be rendered anyways...
    },
];