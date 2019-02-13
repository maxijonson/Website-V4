import createHistory from "history/createBrowserHistory";
import _ from "lodash";
import React, { ReactNode } from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import styled from "styled-components";

// Pages
import { ITheme } from "src/modules/CSS/themes";
import { IStoreState } from "src/store/config";
import { BlogPage, HomePage, NotFoundPage } from "../pages";

interface IAppRouterProps {
    theme: ITheme;
}

interface IPageWrapperProps {
    className?: string;
    children?: ReactNode;
    theme: ITheme;
}

export interface IRoute {
    name: string;
    component: () => JSX.Element;
    hidden?: boolean;
    path: string;
    exact?: boolean;
}

export const history = createHistory();

export const routes: IRoute[] = [
    {
        name: "Home",
        path: "/",
        exact: true,
        component: HomePage,
    },
    {
        name: "Blog",
        path: "/blog",
        exact: true,
        component: BlogPage,
    },
    {
        name: "Not Found",
        path: "",
        component: NotFoundPage,
        hidden: true,
    },
];

const PageWrapper = (props: IPageWrapperProps) => (
    <div className={props.className}>{props.children}</div>
);

const PageWrapperStyled = styled(PageWrapper)`
    background: ${({ theme }: IPageWrapperProps) =>
        theme.colors.pageBackground};
    width: 100vw;
    height: 100vh;
`;

const mapStateToProps = ({ theme }: IStoreState): IPageWrapperProps => ({
    theme,
});

const AppRouter = ({ theme }: IAppRouterProps) => (
    <Router history={history}>
        <PageWrapperStyled theme={theme}>
            <Switch>
                {_.map(routes, ({ name, path, component, exact }) => (
                    <Route
                        key={name}
                        path={path}
                        component={component}
                        exact={exact}
                    />
                ))}
            </Switch>
        </PageWrapperStyled>
    </Router>
);

export default connect(mapStateToProps)(AppRouter);
