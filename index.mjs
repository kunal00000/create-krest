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
    display: "Basic CRUD",
    color: "blue"
  },
  {
    name: "auth_jwt",
    display: "CRUD + JWT Auth",
    color: "green"
  },
  {
    name: "db_mongo",
    display: "CRUD + MongoDB Database",
    color: "red"
  },
  {
    name: "auth_jwt-db_mongo",
    display: "CRUD + MongoDB Database + JWT Auth",
    color: "yellow"
  }
];

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

      console.log(
        `\n Scaffolding project in ${process.cwd()}` + "/server...",
        "\n\n",
        "Setup environment variables by changing .env.example to .env and add variables",
        "\n\n",
        "Done. Now run",
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
