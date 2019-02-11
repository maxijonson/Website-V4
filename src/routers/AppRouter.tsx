import createHistory from "history/createBrowserHistory";
import React, { ReactNode } from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import styled from "styled-components";

// Pages
import { ITheme } from "src/modules/CSS/themes";
import { IStoreState } from "src/store/config";
import { HomePage, NotFoundPage } from "../pages";

export const history = createHistory();

interface IAppRouterProps {
    theme: ITheme;
}

interface IPageWrapperProps {
    className?: string;
    children?: ReactNode;
    theme: ITheme;
}

const PageWrapper = (props: IPageWrapperProps) => (
    <div className={props.className}>{props.children}</div>
);

const PageWrapperStyled = styled(PageWrapper)`
    background: ${({ theme }: IPageWrapperProps) => theme.colors.white};
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
                <Route path="/" exact component={HomePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </PageWrapperStyled>
    </Router>
);

export default connect(mapStateToProps)(AppRouter);
