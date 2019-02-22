import { HomePage, NotFoundPage } from "../pages";

export interface IRoute {
    name: string;
    component: () => JSX.Element | null;
    hidden?: boolean;
    path: string;
    exact?: boolean;
}

export const routes: IRoute[] = [
    {
        name: "Home",
        path: "/",
        exact: true,
        component: HomePage,
    },
    {
        name: "Portfolio",
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
