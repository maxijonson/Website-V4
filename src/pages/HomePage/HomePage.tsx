import * as _ from "lodash";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import {
    Cards,
    Section,
    ViewportContainer,
    app,
    Modal,
    Card,
} from "tchin-react-components";
import { PATHS } from "src/config";
import HomeExperience from "./HomeExperience";
import HomeLanding from "./HomeLanding";

let oldWarningShown = false;

export default () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const mounted = React.useRef(true);
    const { t } = useTranslation();

    const handleRequestClose = () => {
        setModalVisible(false);
    };

    React.useEffect(() => {
        if (!oldWarningShown) {
            app.notify(t("long.home.welcome.old.toast"), {
                autoClose: false,
                onClose: () => {
                    if (mounted.current) {
                        setModalVisible(true);
                    }
                },
            });
            oldWarningShown = true;
        }

        return () => {
            mounted.current = false;
        };
    }, []);
    return (
        <>
            {/*** INTRO ***/}
            <ViewportContainer
                background={PATHS.images.homeIntroBg}
                backgroundOverlay
            >
                <HomeLanding />
            </ViewportContainer>
            {/*** /INTRO ***/}
            <Modal
                bottom
                visible={modalVisible}
                onRequestClose={handleRequestClose}
                parent={document.getElementById("app")}
            >
                <Card title={t("long.home.welcome.old.title")}>
                    {t("long.home.welcome.old.content", {
                        postProcess: "markdown-jsx",
                    })}
                </Card>
            </Modal>
            <Cards.Fade
                alt
                right
                animate
                fraction={0.8}
                title={t("home.welcome.title")}
                subtitle={t("home.welcome.subtitle")}
                footer={t(
                    `home.welcome.funfact.${
                        _.includes(window.location.hostname, "maxijonson")
                            ? "tristan"
                            : "maxijonson"
                    }`,
                    {
                        postProcess: "markdown-jsx",
                    }
                )}
                imageUrl={
                    _.includes(window.location.hostname, "maxijonson")
                        ? "assets/images/logo.png"
                        : "assets/images/tristan.jpg"
                }
            >
                {t("long.home.welcome.body")}
            </Cards.Fade>
            <Cards.Fade
                left
                animate
                fraction={0.8}
                title={t("home.playground.title")}
                subtitle={t("home.playground.subtitle")}
                imageUrl="assets/images/react-ts.jpg"
                footer={t("long.home.playground.footer", {
                    postProcess: "markdown-jsx",
                })}
            >
                {t("long.home.playground.body", {
                    postProcess: "markdown-jsx",
                })}
            </Cards.Fade>

            <Section
                items={[
                    {
                        title: t("home.sections.about.title"),
                        content: t("long.home.sections.about.content", {
                            postProcess: "markdown-jsx",
                            age: moment().diff("1998-07-27", "years"),
                        }),
                    },
                    {
                        title: t("home.sections.youtube.title"),
                        content: t("long.home.sections.youtube.content", {
                            postProcess: "markdown-jsx",
                        }),
                    },
                    {
                        title: t("home.sections.programming.title"),
                        content: t("long.home.sections.programming.content", {
                            postProcess: "markdown-jsx",
                        }),
                    },
                    {
                        title: t("home.sections.experience.title"),
                        content: <HomeExperience />,
                    },
                ]}
            />
        </>
    );
};
