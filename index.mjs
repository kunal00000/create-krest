#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";
import inquirer from "inquirer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { copyDir } from "./services/index.js";

const currentDir = fileURLToPath(import.meta.url);

const VARIANTS = [
  {
    name: "basic",
    display: "Basic CRUD"
  },
  {
    name: "auth_jwt",
    display: "CRUD + JWT Auth"
  },
  {
    name: "db_mongo",
    display: "CRUD + MongoDB Database"
  },
  {
    name: "auth_jwt-db_mongo",
    display: "CRUD + MongoDB Database + JWT Auth"
  }
];

const renameFiles = (serverFolder) => {
  const oldGitignorePath = join(serverFolder, "_gitignore");
  const newGitignorePath = join(serverFolder, ".gitignore");
  const oldEnvPath = join(serverFolder, ".env.example");
  const newEnvPath = join(serverFolder, ".env");
  fs.renameSync(oldGitignorePath, newGitignorePath);
  fs.renameSync(oldEnvPath, newEnvPath);
};

program.action(() => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "variant",
        message: "Select a variant to create API:",
        choices: VARIANTS.map((v) => v.display)
      }
    ])
    .then((answers) => {
      const { variant } = answers;

      const serverFolder = join(process.cwd(), "server");
      if (fs.existsSync(serverFolder)) {
        fs.rmdirSync(serverFolder);
      }
      fs.mkdirSync(serverFolder);

      const variantSelected = VARIANTS.find((v) => v.display == variant);
      const sourceString = "template-" + variantSelected.name + "-js";

      const sourceDirectory = join(
        dirname(currentDir),
        "templates",
        sourceString
      );
      copyDir(sourceDirectory, serverFolder);

      renameFiles(serverFolder);

      console.log(
        `\n Scaffolding project in ${process.cwd()}` + "/server...",
        "\n\n",
        "Done. Now setup environment variables and run",
        "\n\n",
        "  cd server",
        "\n",
        "  npm install",
        "\n",
        "  npm run dev\n"
      );
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
});

program.parse(process.argv);
