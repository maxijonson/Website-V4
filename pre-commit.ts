import { writeFileSync } from "fs";
import branch from "git-branch";
import { argv } from "yargs";
import pkg from "./package.json";

const NCP_PREFIX = "NCP";
const MINOR_PREFIX = "^";
const PATCH_PREFIX = "MJ";
const HEROKU = "master";

interface IArgs {
    message?: string;
    [x: string]: unknown;
}

enum IExitCode {
    NCP = 0,
    OK = 0,
    NOT_VERSION = 0,
    NOT_HEROKU = 0,
    MISSING_MESSAGE = 1,
    VERSION_SYNTAX = 2,
    UNKNOWN = 1337,
}
const {
    MISSING_MESSAGE,
    UNKNOWN,
    NCP,
    OK,
    VERSION_SYNTAX,
    NOT_VERSION,
    NOT_HEROKU,
} = IExitCode;

process.on("exit", (code: IExitCode) => {
    switch (code) {
        case MISSING_MESSAGE:
            return console.error("Message is missing");
        case UNKNOWN:
            return console.error("Unknown error");
    }
});

const raise = (code: IExitCode) => process.exit(code);

const gitBranch = branch.sync();
if (gitBranch != HEROKU) {
    raise(NOT_HEROKU);
}

const { message }: IArgs = argv;
if (message) {
    if (message.startsWith(NCP_PREFIX)) {
        raise(NCP);
    }

    const isMinor = message.startsWith(MINOR_PREFIX);
    const isPatch = message.startsWith(PATCH_PREFIX);

    if (!isMinor && !isPatch) {
        raise(NOT_VERSION);
    }

    const [major, minor, patch] = pkg.version.split("."); // e.g: ['1', '0', '4']
    if (!major || !minor || !patch) {
        raise(VERSION_SYNTAX);
    }

    const newPatch = isPatch ? parseInt(patch) + 1 : 0;
    const newMinor = isMinor ? parseInt(minor) + 1 : minor;

    const newVersion = `${major}.${newMinor}.${newPatch}`;
    const newPkg = Object.assign({}, pkg, { version: newVersion }); // update version
    writeFileSync("./package.json", JSON.stringify(newPkg, null, 4));

    console.info(
        "Package Version Updated From:",
        pkg.version,
        "to:",
        newVersion,
    );
    raise(OK);
}
raise(MISSING_MESSAGE);
