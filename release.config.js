const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const changelogTitle = `# Changelog

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.`;

/** @type import('semantic-release').Options */
module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        presetConfig: {},
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {},
        writerOpts: {
          commitPartial: readFileSync(join(__dirname, "./commit.hbs"), {
            encoding: "utf-8",
          }),
        },
      },
    ],
    ["@semantic-release/changelog", { changelogTitle }],
    [
      "@semantic-release/git",
      {
        assets: [
          "CHANGELOG.md",
          "package.json",
          "package-lock.json",
          "default.json",
        ],
      },
    ],
    "@semantic-release/github",
  ],
};
