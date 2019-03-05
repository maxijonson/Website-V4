import React from "react";
import { connect, MapStateToPropsParam } from "react-redux";
import { t } from "src/app";
import { STYLE_CENTERED, THEME_TRANSITION_TIME } from "src/config/config";
import { CSS } from "src/modules";
import { ITheme } from "src/modules/CSS/themes";
import { Card, Header, ViewportContainer } from "../components";

interface IOwnProps {}

interface IStateProps {
    theme: ITheme;
}

type HomePageProps = IOwnProps & IStateProps;

const { fonts } = CSS;

const HomePage = (props: HomePageProps) => {
    const { theme } = props;

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
                <Header />
                <div
                    style={{
                        ...STYLE_CENTERED,
                        display: "table",
                        width: "100%",
                        textShadow: `0 0 .75em ${
                            theme.colors.altDefaultShadow
                        }`,
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            display: "table-cell",
                            verticalAlign: "middle",
                            transition: `all ${THEME_TRANSITION_TIME}s`,
                            color: theme.colors.intro,
                        }}
                    >
                        <div
                            style={{
                                fontSize: "4rem",
                                fontFamily: fonts.Kaushan.family,
                            }}
                        >
                            {t("home.intro.welcome")}
                        </div>
                        <div
                            style={{
                                fontSize: "6rem",
                                fontFamily: fonts.exo.family,
                            }}
                        >
                            {t("home.intro.maxijonson")}
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
                                fontFamily: fonts.openSans.family,
                            }}
                        >
                            {t("home.intro.tagline")}
                        </div>
                    </div>
                </div>
            </ViewportContainer>
            {/*** /INTRO ***/}
            <Card
                title={t("home.welcome.title")}
                subtitle={t("home.welcome.subtitle")}
                backgroundUrl="assets/images/logo.png"
            >
                {t("long.home.welcome.body")}
            </Card>
        </>
    );
};

const mapStateToProps: MapStateToPropsParam<
    IStateProps,
    IOwnProps,
    IStoreState
> = ({ theme }: IStoreState): IStateProps => ({
    theme,
});

export default connect(mapStateToProps)(HomePage);
