import { PATHS } from "src/config";
import { t } from "src/modules";
import { ITechName } from "../HomePage/subjects";

interface ITech {
    name: ITechName;
    color: string;
    image?: string;
}

const techs: { [name: string]: ITech } = {
    html: {
        name: "HTML",
        color: "#E34C26",
    },
    css: {
        name: "CSS",
        color: "#563D7C",
    },
    javascript: {
        name: "JavaScript",
        color: "#F1E05A",
    },
    jquery: {
        name: "JQuery",
        color: "#00CAFE",
    },
    node: {
        name: "Node",
        color: "#71B417",
    },
    typescript: {
        name: "TypeScript",
        color: "#2B7489",
    },
    react: {
        name: "React",
        color: "#0096D8",
    },
    asp: {
        name: "ASP.Net",
        color: "#6A40FD",
    },
    php: {
        name: "PHP",
        color: "#4F5D95",
    },
    cpp: {
        name: "C++",
        color: "#F34B7D",
    },
    cs: {
        name: "C#",
        color: "#178600",
    },
    java: {
        name: "Java",
        color: "#B07219",
    },
    electron: {
        name: "Electron",
        color: "#77D9FB",
    },
    oracle: {
        name: "Oracle SQL",
        color: "#C22D40",
    },
    mysql: {
        name: "MySQL",
        color: "#C22D40",
    },
    sqlserver: {
        name: "SQL Server",
        color: "#C22D40",
    },
    sqlite: {
        name: "SQLite",
        color: "#C22D40",
    },
    mongodb: {
        name: "MongoDB",
        color: "#5C7611",
    },
    android: {
        name: "Android",
        color: "#89E051",
    },
    shell: {
        name: "Shell",
        color: "#00004C",
    },
};

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
        title: "Intellibot",
        description: [
            t("portfolio.projects.intellibot.description"),
            t("portfolio.projects.intellibot.description"),
        ],
        logo: PATHS.images.intellibot.logo,
        techs: [techs.node, techs.javascript],
        github: "https://github.com/maxijonson/Intellibot",
        discord:
            "https://discordapp.com/oauth2/authorize?client_id=356619840649428993&scope=bot&permissions=271707143",
        website: "http://www.maxijonson.com/intellibot/",
        short: "The ultimate multipurpose discord bot",
    },
];
