import { PATHS } from "src/config";
import { t } from "src/modules";
import { ITech, techs } from "./techs";

export interface IProject {
    title: string;
    short: string;
    description: string[];
    logo: string;
    techs: ITech[];
    github?: string;
    discord?: string;
    website?: string;
    steam?: string;
}

export const projects: IProject[] = [
    {
        title: "Website",
        description: [t("portfolio.projects.website.description")],
        logo: PATHS.images.projects.website.logo,
        techs: [
            techs.node,
            techs.typescript,
            techs.html,
            techs.scss,
            techs.react,
        ],
        github: "https://github.com/maxijonson/Website-V4",
        website: "http://www.chintristan.io/",
        short: t("portfolio.projects.website.short"),
    },
    {
        title: "Cuisto",
        description: [t("portfolio.projects.cuisto.description")],
        logo: PATHS.images.projects.cuisto.logo,
        techs: [
            techs.node,
            techs.javascript,
            techs.html,
            techs.css,
            techs.android,
            techs.mysql,
            techs.jquery,
        ],
        github: "https://github.com/maxijonson/Cuisto-public",
        short: t("portfolio.projects.cuisto.short"),
    },
    {
        title: "PunchBot",
        description: [t("portfolio.projects.punchbot.description")],
        logo: PATHS.images.projects.punchbot.logo,
        techs: [techs.node, techs.javascript],
        github: "https://github.com/maxijonson/PunchBot",
        discord:
            "https://discordapp.com/oauth2/authorize?client_id=483973436255895553&scope=bot&permissions=68608",
        short: t("portfolio.projects.punchbot.short"),
    },
    {
        title: "Intellibot",
        description: [t("portfolio.projects.intellibot.description")],
        logo: PATHS.images.projects.intellibot.logo,
        techs: [techs.node, techs.javascript],
        github: "https://github.com/maxijonson/Intellibot",
        discord:
            "https://discordapp.com/oauth2/authorize?client_id=356619840649428993&scope=bot&permissions=271707143",
        website: "http://www.maxijonson.com/intellibot/",
        short: t("portfolio.projects.intellibot.short"),
    },
    {
        title: "React",
        description: [t("portfolio.projects.react.description")],
        logo: PATHS.images.projects.react.logo,
        techs: [techs.javascript, techs.html, techs.css],
        github: "https://github.com/maxijonson/React---Wallpaper-Engine",
        steam:
            "https://steamcommunity.com/sharedfiles/filedetails/?id=1108769435",
        short: t("portfolio.projects.react.short"),
    },
];
