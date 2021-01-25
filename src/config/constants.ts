import * as _ from "lodash";

export const PATHS = {
    images: {
        homeIntroBg: "/assets/images/home-intro-bg.jpg",
        portfolioBg: "/assets/images/portfolio-intro-bg.jpg",
        notFoundBg: "/assets/images/notfound-bg.jpg",
        projects: {
            nuclui: {
                logo: "/assets/images/portfolio/nuclui.png",
            },
            trc: {
                logo: "/assets/images/portfolio/trc.png",
            },
            website: {
                logo: "/assets/images/portfolio/website.png",
            },
            cuisto: {
                logo: "/assets/images/portfolio/cuisto.png",
            },
            punchbot: {
                logo: "/assets/images/portfolio/punchbot.png",
            },
            intellibot: {
                logo: "/assets/images/portfolio/intellibot.png",
            },
            react: {
                logo: "/assets/images/portfolio/react.jpg",
            },
            poly: {
                logo: "/assets/images/portfolio/poly.png",
            },
        },
    },
};

type ILocation = "MaxiJonson" | "Tristan Chin";
export const location: ILocation = _.includes(
    window.location.hostname,
    "maxijonson"
)
    ? "MaxiJonson"
    : "Tristan Chin";
