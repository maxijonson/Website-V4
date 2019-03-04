import { ConnectedComponentClass } from "react-redux";
import { t } from "src/app";
import { HomePage, NotFoundPage } from "../pages";

export interface IRoute {
    name: string;
    component: ConnectedComponentClass<any, any> | (() => JSX.Element | null);
    hidden?: boolean;
    path: string;
    exact?: boolean;
}

export const routes: IRoute[] = [
    {
        name: t("header.home"),
        path: "/",
        exact: true,
        component: HomePage,
    },
    {
        name: t("header.portfolio"),
        path: "/portfolio",
        exact: true,
        component: HomePage,
    },
    {
        name: "Intellibot",
        path: "/intellibot",
        exact: true,
        component: () => {
            window.location.href = "http://maxijonson.com/intellibot/";
            return null;
        },
    },
    {
        name: "Not Found",
        path: "",
        component: NotFoundPage,
        hidden: true,
    },
];
