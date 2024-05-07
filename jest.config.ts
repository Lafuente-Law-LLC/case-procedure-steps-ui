/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageProvider: "babel",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
};

export default config;
