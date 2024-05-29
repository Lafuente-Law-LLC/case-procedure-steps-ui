const { green, cyan, red } = require("chalk");
const webpack = require("webpack");
const path = require("path");
const fse = require("fs-extra");
const shellJS = require("shelljs");
const { globSync } = require("glob");
const cherryPick = require("cherry-pick").default;
const getConfig = require("../webpack.config.js");

const paths = {
  srcRoot: path.join(__dirname, "../src"),
  typesRoot: path.join(__dirname, "../lib/src"),
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

const shell = (cmd) => shellJS.exec(cmd, { silent: false }).code === 0;

const step = (name, fn) => async () => {
  log.step(name);
  await fn();
  log.stepCompleted(name);
};

const has = (t) => !targets.length || targets.includes(t);

const buildTypes = step("generating .d.ts", () => shell("yarn build-types"));

const copyTypes = (dest) => {
  const jsfiles = globSync(`${paths.typesRoot}/**/*.d.ts`);
  if (!jsfiles.length) {
    return;
  }
  jsfiles.forEach((file) => {
    let relative = path.relative(paths.typesRoot, file);
    shell(`cp ${file} ${path.join(dest, relative)}`);
  });
};

const babel = (outDir, envName) =>
  shell(
    `yarn babel ${paths.srcRoot} -x .es6,.js,.es,.jsx,.mjs,.ts,.tsx --out-dir ${outDir} --env-name "${envName}"`,
  );

const buildLib = step("commonjs modules", async () => {
  await babel(paths.cjsRoot, "cjs");
  copyTypes(paths.cjsRoot);
});

const buildEsm = step("es modules", async () => {
  await babel(paths.esRoot, "esm");
  copyTypes(paths.esRoot);
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
    await Promise.all([has("lib") && buildLib(), has("es") && buildEsm()]);
    //await buildDirectories();
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};

runBuild();
