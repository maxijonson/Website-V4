import createHistory from "history/createBrowserHistory";
import _ from "lodash";
import React, { ReactNode } from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import styled from "styled-components";

import { ITheme } from "../../src/modules/CSS/themes";
import { IStoreState } from "../../src/store/config";
import { Footer } from "../components";
import { fonts } from "../modules/CSS";
import { routes } from "./routes";

interface IAppRouterProps {
    theme: ITheme;
}

interface IPageWrapperProps {
    className?: string;
    children?: ReactNode;
    theme: ITheme;
}

export const history = createHistory();

const PageWrapper = (props: IPageWrapperProps) => (
    <div className={props.className}>{props.children}</div>
);

const PageWrapperStyled = styled(PageWrapper)`
    background-color: ${({ theme }: IPageWrapperProps) =>
        theme.colors.pageBackground};
    width: 100vw;
    font-family: ${fonts.fonts.oswald.family};
    min-height: 98.45250474vh;
    transition: all 0.2s linear;
    flex: 1 0 auto;
`;

const mapStateToProps = ({ theme }: IStoreState): IPageWrapperProps => ({
    theme,
});

const AppRouter = ({ theme }: IAppRouterProps) => (
    <Router history={history}>
        <React.Fragment>
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
            <Footer />
        </React.Fragment>
    </Router>
);

export default connect(mapStateToProps)(AppRouter);
