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

const PortfolioLanding = styled.div<{ theme: ITheme }>`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: ${({ theme }) => `0 0 .75em ${theme.colors.altDefaultShadow}`};
`;

export default () => {
    const { theme } = useConnect(({ theme }) => ({ theme }));
    const { t } = useTranslation();

    return (
        <PortfolioLanding theme={theme}>
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
                        fontSize: "6rem",
                        fontFamily: app.fonts.roboto.family,
                        textTransform: "uppercase",
                    }}
                >
                    {t("header.portfolio")}
                </div>
            </div>
        </PortfolioLanding>
    );
};
