import React from "react";
import { connect, MapStateToPropsParam } from "react-redux";
import { STYLE_CENTERED, THEME_TRANSITION_TIME } from "src/config/config";
import { CSS } from "src/modules";
import { ITheme } from "src/modules/CSS/themes";
import { IStoreState } from "src/store/config";
import { Header, ViewportContainer } from "../components";

interface IOwnProps {}

interface IStateProps {
    theme: ITheme;
}

type HomePageProps = IOwnProps & IStateProps;

const { fonts } = CSS.fonts;

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
                style={{ overflow: "hidden" }}
                backgroundOverlay
                backgroundOverlayProps={{
                    style: {
                        background: theme.colors.introOverlay,
                        transition: `all ${THEME_TRANSITION_TIME}s`,
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
                            Welcome to
                        </div>
                        <div
                            style={{
                                fontSize: "6rem",
                                fontFamily: fonts.exo.family,
                            }}
                        >
                            MAXIJONSON'S OFFICIAL WEBSITE
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
                            Former Youtuber | Computer science student
                        </div>
                    </div>
                </div>
            </ViewportContainer>
            {/*** /INTRO ***/}
            <div
                style={{
                    background: `${theme.colors.sectionCard}`,
                    width: "90%",
                    display: "grid",
                    gridTemplateColumns: "75% 25%",
                    margin: "2.5% auto",
                    filter: `drop-shadow(0 .35em .35em ${
                        theme.colors.sectionCardShadow
                    })`,
                    borderRadius: "1em",
                    fontSize: "1.6rem",
                    color: theme.colors.defaultText,
                    transition: `all ${THEME_TRANSITION_TIME}s`,
                    textAlign: "justify",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        gridColumnStart: "1",
                        padding: "0.5% 1.5%",
                    }}
                >
                    <h1>Title</h1>
                    <h3>Sub-title</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Placeat omnis totam inventore cum repellat eligendi
                        perspiciatis, mollitia, quo corrupti atque in magnam
                        odit maxime molestias voluptate dicta. Esse, a eius.
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Quia repellendus eligendi quod velit ipsum ducimus
                        reprehenderit ratione sapiente aperiam repellat tempora,
                        ipsam aut! Voluptatum veniam repudiandae architecto iure
                        reprehenderit ipsa? Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Vel similique ipsam nihil
                        animi quasi placeat, dolorum pariatur incidunt tenetur
                        ipsa? Sint vel maiores esse molestias ad perspiciatis
                        totam, error voluptas! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Animi reprehenderit
                        facilis porro et, doloribus error, rerum voluptate,
                        earum quis in quam. Alias maiores doloribus commodi
                        soluta omnis perferendis quos accusamus?
                    </p>
                </div>
                <div
                    style={{
                        gridColumnStart: "2",
                        background:
                            "url('/assets/images/home-youtube-card.jpg') center no-repeat",
                        backgroundSize: "cover",
                    }}
                />
            </div>
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
