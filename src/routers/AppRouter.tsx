import createHistory from "history/createBrowserHistory";
import _ from "lodash";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import styled from "styled-components";

// import { Translation } from "react-i18next";
import { Footer, Header } from "src/components";
import { THEME_TRANSITION_TIME } from "src/config/config";
import { Hooks } from "src/modules";
import { fonts } from "src/modules/CSS";
import { routes } from "./routes";

const { useMapState } = Hooks;

export const history = createHistory();

export default () => {
    const { theme } = useMapState(({ theme }) => ({ theme }));

    const PageWrapperStyled = React.useMemo(
        () => styled.div`
            background-color: ${theme.colors.pageBackground};
            width: auto;
            font-family: ${fonts.oswald.family};
            min-height: 98.45250474vh;
            transition: all ${THEME_TRANSITION_TIME}s;
            flex: 1 0 auto;
            overflow: auto;
        `,
        [],
    );

    return (
        <Router history={history}>
            <React.Fragment>
                <Header />
                <PageWrapperStyled theme={theme}>
                    <Switch>
                        {_.map(routes, ({ key, path, component, exact }) => (
                            <Route
                                key={key}
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
};
