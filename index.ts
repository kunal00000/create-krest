#!/usr/bin/env node
import chalk from "chalk";
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
    display: chalk.yellowBright("Javascript"),
    variants: getVariantsForLang("js", currentDir)
  },
  {
    name: "ts",
    display: chalk.blueBright("Typescript"),
    variants: getVariantsForLang("ts", currentDir)
  }
];

const VARIANTS = [
  {
    name: "basic",
    display: chalk.blue("CRUD")
  },
  {
    name: "auth_jwt",
    display: chalk.blue("CRUD") + " + " + chalk.yellow("JWT Auth")
  },
  {
    name: "db_mongo",
    display: chalk.blue("CRUD") + " + " + chalk.green("MongoDB Database")
  },
  {
    name: "auth_jwt_db_mongo",
    display:
      chalk.blue("CRUD") +
      " + " +
      chalk.yellow("JWT Auth") +
      " + " +
      chalk.green("MongoDB Database")
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
          return langSelected?.variants.map(
            (lv_name: string) =>
              VARIANTS.find((v) => v.name == lv_name)?.display
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
        "template-" + variantSelected?.name + "-" + langSelected?.name;

      const sourceDirectory = join(
        dirname(currentDir),
        "../templates",
        sourceString
      );
      copyDir(sourceDirectory, serverFolder);

      renameFiles(serverFolder);

      console.log(
        chalk.blueBright("\n ") +
          `Scaffolding project in ${process.cwd()}` +
          "/server...",
        "\n\n",
        chalk.blueBright(">> ") +
          "Done. " +
          chalk.magentaBright("Now setup environment variables and run:"),
        "\n\n",
        chalk.blueBright(">> ") + "" + chalk.yellow("cd server"),
        "\n",
        "   " + chalk.yellow("npm install"),
        "\n",
        "   " + chalk.yellow("npm run dev\n")
      );
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
});

program.parse(process.argv);
