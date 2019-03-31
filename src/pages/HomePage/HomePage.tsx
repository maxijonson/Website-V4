import React from "react";
import { useTranslation } from "react-i18next";
import { Cards, ViewportContainer } from "src/components";
import { PATHS, THEME_TRANSITION_TIME } from "src/config/config";
import { Hooks } from "src/modules";
import HomeLanding from "./HomeLanding";

const { useMapState } = Hooks;

export default () => {
    const { theme } = useMapState(({ theme }) => ({ theme }));
    const { t } = useTranslation();

    return (
        <>
            {/*** INTRO ***/}
            <ViewportContainer
                background={{
                    backgroundImage: `url(${PATHS.images.homeIntroBg})`,
                    transform: "scale(1.2)",
                    transition: `all ${THEME_TRANSITION_TIME}s`,
                    filter: `${
                        theme.name == "light"
                            ? "blur(5px) brightness(90%)"
                            : "blur(5px) brightness(30%)"
                    }`,
                }}
                style={{
                    overflow: "hidden",
                    transition: `all ${THEME_TRANSITION_TIME}s`,
                }}
                backgroundOverlay
                backgroundOverlayProps={{
                    style: {
                        background: theme.colors.introOverlay,
                    },
                }}
            >
                <HomeLanding />
            </ViewportContainer>
            {/*** /INTRO ***/}
            <Cards.Fade
                alt
                top
                animate
                fraction={0.8}
                title={t("home.welcome.title")}
                subtitle={t("home.welcome.subtitle")}
                footer={t("long.home.welcome.footer")}
                imageUrl="assets/images/logo.png"
            >
                {t("long.home.welcome.body")}
            </Cards.Fade>
            <Cards.Fade
                top
                animate
                fraction={0.8}
                title={t("home.playground.title")}
                subtitle={t("home.playground.subtitle")}
                imageUrl="assets/images/react-ts.jpg"
            >
                {t("long.home.playground.body")}
            </Cards.Fade>
            <Cards.Fade
                top
                alt
                animate
                fraction={0.8}
                title={t("home.share.title")}
                subtitle={t("home.share.subtitle")}
                imageUrl="assets/images/code-1.jpg"
            >
                {t("long.home.share.body", {
                    postProcess: "markdown-jsx",
                })}
            </Cards.Fade>
        </>
    );
};
