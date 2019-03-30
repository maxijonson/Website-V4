import chalk from "chalk";
import * as fs from "fs";
import branch from "git-branch";
import gulp from "gulp";
import * as shell from "shelljs";
import {
    BUMP_VERSION,
    CHERRY_PICK,
    POST_COMMIT,
    PRE_COMMIT,
    PREPARE_COMMIT,
    REQUIRE_HEROKU,
    REQUIRE_MESSAGE,
    REQUIRE_NOT_NCP,
    REQUIRE_VERSION,
} from "./gulpTasks.json";
import pkg from "./package.json";

shell.config.silent = true;
shell.config.verbose = false;

// > 1000 = Good exit
// < 1000 = Bad exit (error)
interface IExitCode {
    code: number;
    message?: string;
}
interface IExitCodes {
    [name: string]: IExitCode;
}

const NCP_PREFIX = "NCP";
const MINOR_PREFIX = "^";
const PATCH_PREFIX = "MJ";
const HEROKU = "master";
const GITHUB = "Github";
const BUMP_MSG = "Bumped version";

const getBranchName = () => branch.sync();
const getCommitMsg = () => fs.readFileSync(".git/COMMIT_EDITMSG", "utf8");
let isExiting = false;
const exit = (c: IExitCode) => {
    if (isExiting) {
        return;
    }
    const { code, message } = c;

    if (message) {
        code >= 1000
            ? console.info(chalk.blue(`${code}: ${message}`))
            : console.error(chalk.red(`${code}: ${message}`));
    }

    isExiting = true;
};

const exec = (command: string): boolean => {
    const out = shell.exec(command);
    return out.code == 0;
};

const execRes = (command: string, error?: IExitCode): string => {
    if (exec(command)) {
        return shell.exec(command).stdout;
    }
    exit(
        error || {
            code: 4,
            message: "An error occured while executing a shelljs command",
        },
    );
    return "";
};

const getLastCommitID = () =>
    execRes("git rev-parse HEAD", {
        code: 5,
        message: "Coulndn't get the last commit ID",
    });

const EC: IExitCodes = {
    NCP: { code: 1000, message: "NCP. Not performing task." },
    OK: { code: 1001 },
    NOT_VERSION: {
        code: 1002,
        message: `Commit is not a version (not minor (${MINOR_PREFIX}) or patch (${PATCH_PREFIX})): ${getCommitMsg()}`,
    },
    NOT_HEROKU: {
        code: 1003,
        message: `Commit was not made on ${HEROKU}. Not performing task.`,
    },
    BUMP: {
        code: 1004,
        message: `Package has been succesfully bumped and commited`,
    },

    MISSING_MESSAGE: { code: 1, message: "Missing commit message" },
    VERSION_SYNTAX: {
        code: 2,
        message: "Version does not mean the pattern x.x.x",
    },
    UNKNOWN: { code: 3, message: "An unknown error occured" },

    // SHELL_ERROR: 4

    // COMMIT_ID_ERROR: 5

    CHECKOUT_GITHUB_ERROR: {
        code: 6,
        message: `Couldn't checkout to ${GITHUB}`,
    },
    CHERRY_PICK_ERROR: {
        code: 7,
        message: `Couldn't cherry pick ${getLastCommitID()} .`,
    },
    CHECKOUT_HEROKU_ERROR: {
        code: 7,
        message: `Couldn't checkout to ${HEROKU}`,
    },
};

const [major, minor, patch] = pkg.version.split(".");

gulp.task("init", (done) => {
    isExiting = false;
    done();
});

gulp.task(REQUIRE_HEROKU.task, (done) => {
    if (isExiting) {
        return done();
    }

    if (getBranchName() != HEROKU) {
        exit(EC.NOT_HEROKU);
    }
    done();
});

gulp.task(REQUIRE_VERSION.task, (done) => {
    if (isExiting) {
        return done();
    }

    if (!major || !minor || !patch) {
        exit(EC.VERSION_SYNTAX);
        return done(EC.VERSION_SYNTAX);
    }
    done();
});

gulp.task(REQUIRE_MESSAGE.task, (done) => {
    if (isExiting) {
        return done();
    }

    if (!getCommitMsg()) {
        exit(EC.MISSING_MESSAGE);
        return done(EC.MISSING_MESSAGE);
    }
    done();
});

gulp.task(
    REQUIRE_NOT_NCP.task,
    gulp.series(REQUIRE_MESSAGE.task, (done) => {
        if (isExiting) {
            return done();
        }

        if (getCommitMsg().startsWith(NCP_PREFIX)) {
            exit(EC.NCP);
        }
        done();
    }),
);

gulp.task(
    BUMP_VERSION.task,
    gulp.series(
        REQUIRE_NOT_NCP.task, // This one also runs REQUIRE_MESSAGE
        REQUIRE_VERSION.task,
        (done) => {
            if (isExiting) {
                return done();
            }

            const message = getCommitMsg();

            if (message == BUMP_MSG) {
                done();
                return exit(EC.BUMP);
            }

            const isMinor = message.startsWith(MINOR_PREFIX);
            const isPatch = message.startsWith(PATCH_PREFIX);

            if (!isMinor && !isPatch) {
                done();
                return exit(EC.NOT_VERSION);
            }

            console.log(chalk.blue("Bumping version..."));

            const newPatch = isPatch ? parseInt(patch) + 1 : 0;
            const newMinor = isMinor ? parseInt(minor) + 1 : minor;

            const newVersion = `${major}.${newMinor}.${newPatch}`;
            const newPkg = Object.assign({}, pkg, { version: newVersion }); // update version
            fs.writeFileSync("./package.json", JSON.stringify(newPkg, null, 4));

            console.log(
                chalk.green("Package Version Updated"),
                chalk.bold.white(pkg.version),
                chalk.green("->"),
                chalk.bold.white(newVersion),
            );

            console.log(
                chalk.blue("Adding updated"),
                chalk.gray("package.json"),
                chalk.blue("to git..."),
            );
            exec("git add ./package.json");
            console.log(
                chalk.green("Added updated"),
                chalk.gray("package.json"),
                chalk.green("to git"),
            );

            console.log(chalk.blue("Making a commit for the bump..."));
            exec(`git commit -m "${BUMP_MSG}"`);

            done();
        },
    ),
);

gulp.task(
    CHERRY_PICK.task,
    gulp.series(REQUIRE_NOT_NCP.task, (done) => {
        if (isExiting) {
            return done();
        }

        console.log(chalk.blue("Running cherry-pick..."));
        console.log(chalk.cyan(`Getting last commit ID...`));
        const commitID = getLastCommitID();
        console.log(chalk.cyan(`  ${commitID}`));

        console.log(chalk.cyan(`Checking out to ${GITHUB}...`));
        if (!exec(`git checkout ${GITHUB}`)) {
            done(EC.CHECKOUT_GITHUB_ERROR);
            return exit(EC.CHECKOUT_GITHUB_ERROR);
        }
        console.log(chalk.cyan(`Cherry picking last commit...`));
        if (!exec(`git cherry-pick ${commitID} --allow-empty`)) {
            done(EC.CHERRY_PICK_ERROR);
            return exit(EC.CHERRY_PICK_ERROR);
        }
        console.log(chalk.cyan(`Checking out to ${HEROKU}...`));
        if (!exec(`git checkout ${HEROKU}`)) {
            done(EC.CHECKOUT_HEROKU_ERROR);
            return exit(EC.CHECKOUT_HEROKU_ERROR);
        }
        console.log(chalk.green(`Cherry picked ${commitID} into ${GITHUB}`));
        done();
    }),
);

gulp.task(
    POST_COMMIT.task,
    gulp.series(
        "init",
        REQUIRE_HEROKU.task,
        CHERRY_PICK.task,
        BUMP_VERSION.task,
    ),
);

gulp.task(PRE_COMMIT.task, gulp.series("init", REQUIRE_HEROKU.task));

gulp.task(PREPARE_COMMIT.task, gulp.series("init", REQUIRE_HEROKU.task));