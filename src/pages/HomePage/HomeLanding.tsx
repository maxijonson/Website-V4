import * as _ from "lodash";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
    ITheme,
    Hooks,
    THEME_TRANSITION_TIME,
    app,
} from "tchin-react-components";
import styled from "styled-components";

const { useConnect } = Hooks;

const HomeLanding = styled.div<{ theme: ITheme }>`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: ${({ theme }) => `0 0 .75em ${theme.colors.altDefaultShadow}`};
`;

export default () => {
    const { t } = useTranslation();
    const { theme } = useConnect(({ theme }) => ({ theme }));
    return (
        <HomeLanding theme={theme}>
            <div
                style={{
                    textAlign: "center",
                    display: "table-cell",
                    verticalAlign: "middle",
                    transition: `all ${THEME_TRANSITION_TIME}s`,
                    color: theme.colors.defaultText,
                }}
            >
                <div
                    style={{
                        fontSize: "4rem",
                        fontFamily: app.fonts.Kaushan.family,
                    }}
                >
                    {t("home.intro.welcome")}
                </div>
                <div
                    style={{
                        fontSize: "6rem",
                        fontFamily: app.fonts.exo.family,
                    }}
                >
                    {t(
                        `home.intro.${
                            _.includes(window.location.hostname, "maxijonson")
                                ? "maxijonson"
                                : "tristan"
                        }`
                    )}
                </div>
                <hr
                    style={{
                        margin: "1% 35%",
                        transition: `all ${THEME_TRANSITION_TIME}s`,
                        borderColor: theme.colors.defaultText,
                    }}
                />
                <div
                    style={{
                        fontSize: "2rem",
                        fontFamily: app.fonts.openSans.family,
                    }}
                >
                    {_.includes(window.location.hostname, "maxijonson")
                        ? "Tristan Chin"
                        : "MaxiJonson"}
                    {t("home.intro.tagline")}
                </div>
            </div>
        </HomeLanding>
    );
};
