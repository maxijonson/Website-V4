import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { THEME_TRANSITION_TIME } from "src/config/config";
import { Hooks } from "src/modules";
import styled from "styled-components";
import { fonts } from "../modules/CSS";

const { useMapState } = Hooks;

export default () => {
    const { theme } = useMapState(({ theme }) => ({ theme }));
    const { t } = useTranslation();
    const Footer = React.useMemo(
        () => styled.footer`
            color: ${theme.colors.defaultText};
            font-size: 1.2rem;
            text-align: center;
            padding-bottom: 1%;
            transition: all ${THEME_TRANSITION_TIME}s;
            background-color: ${theme.colors.pageBackground};
            font-family: ${fonts.oswald.family};
            width: 100%;
        `,
        [theme],
    );

    return (
        <Footer>
            Copyright <FontAwesomeIcon icon={["far", "copyright"]} />{" "}
            {new Date().getFullYear()} MaxiJonson. {t("footer.copyright")}
        </Footer>
    );
};
