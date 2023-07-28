#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";
import inquirer from "inquirer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { copyDir, getVariantsForLang, renameFiles } from "./services/index.js";

const currentDir = fileURLToPath(import.meta.url);

const LANGUAGES = [
  {
    name: "js",
    display: "Javascript",
    variants: getVariantsForLang("js", currentDir)
  },
  {
    name: "ts",
    display: "Typescript",
    variants: getVariantsForLang("ts", currentDir)
  }
];

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
    name: "auth_jwt_db_mongo",
    display: "CRUD + MongoDB Database + JWT Auth"
  }
];

program.action(() => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "language",
        message: "Select a language:",
        choices: () => LANGUAGES.map((l) => l.display)
      },
      {
        type: "list",
        name: "variant",
        message: "Select a variant to create API:",
        choices: (answers) => {
          const { language } = answers;
          const langSelected = LANGUAGES.find((l) => l.display == language);
          return langSelected.variants.map(
            (lv_name) => VARIANTS.find((v) => v.name == lv_name).display
          );
        }
      }
    ])
    .then((answers) => {
      const { variant, language } = answers;

      const serverFolder = join(process.cwd(), "server");
      if (fs.existsSync(serverFolder)) {
        fs.rmdirSync(serverFolder);
      }
      fs.mkdirSync(serverFolder);

      const langSelected = LANGUAGES.find((l) => l.display == language);
      const variantSelected = VARIANTS.find((v) => v.display == variant);
      const sourceString =
        "template-" + variantSelected.name + "-" + langSelected.name;

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
