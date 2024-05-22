const { green, cyan, red } = require("chalk");
const webpack = require("webpack");
const path = require("path");
const fse = require("fs-extra");
const execa = require("execa");
const cherryPick = require("cherry-pick").default;
const getConfig = require("./webpack.config.js");

const paths = {
  srcRoot: path.join(__dirname, "../src"),
  typesRoot: path.join(__dirname, "../types"),
  libRoot: path.join(__dirname, "../lib"),
  distRoot: path.join(__dirname, "../lib/dist"),
  cjsRoot: path.join(__dirname, "../lib/cjs"),
  esRoot: path.join(__dirname, "../lib/esm"),
};

const targets = process.argv.slice(2);

const log = {
  step: (name) => console.log(cyan("Building: ") + green(name)),
  stepCompleted: (name) => console.log(cyan("Built: ") + green(name)),
  error: (err) => console.error(red(err.stack || err.toString())),
  targets: () =>
    console.log(
      green(
        `Building targets: ${targets.length ? targets.join(", ") : "all"}\n`,
      ),
    ),
};

const clean = () =>
  fse.existsSync(paths.libRoot) && fse.removeSync(paths.libRoot);

const shell = (cmd) =>
  execa(cmd, { stdio: ["pipe", "pipe", "inherit"], shell: true });

const step = (name, fn) => async () => {
  log.step(name);
  await fn();
  log.stepCompleted(name);
};

const has = (t) => !targets.length || targets.includes(t);

// Build steps
const buildTypes = step("generating .d.ts", () => shell("yarn build-types"));

const copyTypes = (dest) => shell(`cpy ${paths.typesRoot}/*.d.ts ${dest}`);

const babel = (outDir, envName) =>
  shell(
    `yarn babel ${paths.srcRoot} -x .es6,.js,.es,.jsx,.mjs,.ts,.tsx --out-dir ${outDir} --env-name "${envName}"`,
  );

const buildLib = step("commonjs modules", async () => {
  await babel(paths.cjsRoot, "cjs");
  await copyTypes(paths.cjsRoot);
});

const buildEsm = step("es modules", async () => {
  await babel(paths.esRoot, "esm");
  await copyTypes(paths.esRoot);
});

const buildDist = step(
  "browser distributable",
  () =>
    new Promise((resolve, reject) => {
      webpack([getConfig(null, "production")], (err, stats) => {
        if (err || stats.hasErrors()) {
          reject(err || stats.toJson().errors);
          return;
        }
        resolve();
      });
    }),
);

const buildDirectories = step("Linking directories", () =>
  cherryPick({
    inputDir: "../src",
    cjsDir: "cjs",
    esmDir: "esm",
    cwd: paths.libRoot,
  }),
);


const runBuild = async () => {
  log.targets();
  clean();

  try {
    await buildTypes();
    await Promise.all([
      has("lib") && buildLib(),
      has("es") && buildEsm(),
      has("dist") && buildDist(),
    ]);
    await buildDirectories();
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};

runBuild();
