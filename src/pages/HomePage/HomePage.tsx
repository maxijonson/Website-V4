import React from "react";
import { useTranslation } from "react-i18next";
import { connect, MapStateToPropsParam } from "react-redux";
import { Cards, ViewportContainer } from "src/components";
import { THEME_TRANSITION_TIME } from "src/config/config";
import { ITheme } from "src/modules/CSS/themes";
import Landing from "./Landing";

interface IHomePageOwnProps {}

interface IHomePageStateProps {
    theme: ITheme;
}

type IHomePageProps = IHomePageOwnProps & IHomePageStateProps;

const HomePage = (props: IHomePageProps) => {
    const { theme } = props;
    const { t } = useTranslation();

    return (
        <>
            {/*** INTRO ***/}
            <ViewportContainer
                background={{
                    backgroundImage: "url('/assets/images/home-intro-bg.jpg')",
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
                <Landing />
            </ViewportContainer>
            {/*** /INTRO ***/}
            <Cards.Fade
                alt
                animate
                top
                fraction={0.8}
                title={t("home.welcome.title")}
                subtitle={t("home.welcome.subtitle")}
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

const mapStateToProps: MapStateToPropsParam<
    IHomePageStateProps,
    IHomePageOwnProps,
    IStoreState
> = ({ theme }: IStoreState): IHomePageStateProps => ({
    theme,
});

export default connect(mapStateToProps)(HomePage);
