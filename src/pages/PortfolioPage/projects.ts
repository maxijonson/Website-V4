import { PATHS } from "src/config";
import { ITech, techs } from "./techs";

const {
    node,
    typescript,
    html,
    scss,
    react,
    javascript,
    css,
    android,
    mysql,
    jquery,
} = techs;

export interface IProject {
    title: string;
    short: string;
    description: string[];
    logo: string;
    techs: ITech[];
    github?: string;
    npm?: string;
    discord?: string;
    website?: string;
    steam?: string;
}

export const projects: IProject[] = [
    {
        title: "tchin-react-components",
        description: ["long.portfolio.projects.trc.description"],
        logo: PATHS.images.projects.trc.logo,
        techs: [node, typescript, html, scss, react],
        github: "https://github.com/maxijonson/tchin-react-components",
        npm: "https://www.npmjs.com/package/tchin-react-components",
        short: "portfolio.projects.trc.short",
    },
    {
        title: "portfolio.projects.website.title",
        description: [
            "long.portfolio.projects.website.description.one",
            "long.portfolio.projects.website.description.two",
            "long.portfolio.projects.website.description.three",
        ],
        logo: PATHS.images.projects.website.logo,
        techs: [node, typescript, html, scss, react],
        github: "https://github.com/maxijonson/Website-V4",
        website: "http://www.chintristan.io/",
        short: "portfolio.projects.website.short",
    },
    {
        title: "Cuisto",
        description: [
            "long.portfolio.projects.cuisto.description.one",
            "long.portfolio.projects.cuisto.description.two",
            "long.portfolio.projects.cuisto.description.three",
        ],
        logo: PATHS.images.projects.cuisto.logo,
        techs: [node, javascript, html, css, android, mysql, jquery],
        github: "https://github.com/maxijonson/Cuisto-public",
        short: "portfolio.projects.cuisto.short",
    },
    {
        title: "PunchBot",
        description: ["long.portfolio.projects.punchbot.description"],
        logo: PATHS.images.projects.punchbot.logo,
        techs: [node, javascript],
        github: "https://github.com/maxijonson/PunchBot",
        discord:
            "https://discordapp.com/oauth2/authorize?client_id=483973436255895553&scope=bot&permissions=68608",
        short: "portfolio.projects.punchbot.short",
    },
    {
        title: "Intellibot",
        description: [
            "long.portfolio.projects.intellibot.description.one",
            "long.portfolio.projects.intellibot.description.two",
            "long.portfolio.projects.intellibot.description.three",
        ],
        logo: PATHS.images.projects.intellibot.logo,
        techs: [node, javascript],
        github: "https://github.com/maxijonson/Intellibot",
        discord:
            "https://discordapp.com/oauth2/authorize?client_id=356619840649428993&scope=bot&permissions=271707143",
        website: "http://www.maxijonson.com/intellibot/",
        short: "portfolio.projects.intellibot.short",
    },
    {
        title: "React",
        description: ["long.portfolio.projects.react.description"],
        logo: PATHS.images.projects.react.logo,
        techs: [javascript, html, css],
        github: "https://github.com/maxijonson/React---Wallpaper-Engine",
        steam:
            "https://steamcommunity.com/sharedfiles/filedetails/?id=1108769435",
        short: "portfolio.projects.react.short",
    },
    {
        title: "Poly Wallpaper",
        description: ["long.portfolio.projects.poly.description"],
        logo: PATHS.images.projects.poly.logo,
        techs: [javascript, html, css],
        github: "https://github.com/maxijonson/Poly-Wallpaper",
        steam:
            "https://steamcommunity.com/sharedfiles/filedetails/?id=1084251953",
        short: "portfolio.projects.poly.short",
    },
];
