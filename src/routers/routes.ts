import { ConnectedComponentClass } from "react-redux";
import { t } from "src/app";
import { HomePage, NotFoundPage } from "../pages";

export interface IRoute {
    name: () => string;
    key: string;
    component: ConnectedComponentClass<any, any> | (() => JSX.Element | null);
    hidden?: boolean;
    path: string;
    exact?: boolean;
}

export const routes: IRoute[] = [
    {
        name: () => t("header.home"),
        key: "home",
        path: "/",
        exact: true,
        component: HomePage,
    },
    {
        name: () => t("header.portfolio"),
        path: "/portfolio",
        key: "portfolio",
        exact: true,
        component: HomePage,
    },
    {
        name: () => "Intellibot",
        path: "/intellibot",
        key: "intellibot",
        exact: true,
        component: () => {
            window.location.href = "/intellibot";
            return null;
        },
    },
    {
        name: () => "Not Found",
        key: "notFound",
        path: "",
        component: NotFoundPage,
        hidden: true,
    },
];
