import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

function copyDirectoryRecursive(sourceDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }
  const files = fs.readdirSync(sourceDir);
  files.forEach((file) => {
    const sourcePath = join(sourceDir, file);
    const destPath = join(destDir, file);
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectoryRecursive(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

export function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.error("Source directory doesn't exist.");
    return;
  }
  try {
    copyDirectoryRecursive(srcDir, destDir);
  } catch (err) {
    console.error("Error building server:", err.message);
  }
}

export const renameFiles = (serverFolder) => {
  const oldGitignorePath = join(serverFolder, "_gitignore");
  const newGitignorePath = join(serverFolder, ".gitignore");
  const oldEnvPath = join(serverFolder, ".env.example");
  const newEnvPath = join(serverFolder, ".env");
  fs.renameSync(oldGitignorePath, newGitignorePath);
  fs.renameSync(oldEnvPath, newEnvPath);
};

export const getVariantsForLang = (lang, currentDir) => {
  const files = fs.readdirSync(join(dirname(currentDir), "templates"));
  const selectedFiles = files.filter((file) => file.split("-")[2] == lang);
  const extractNames = extractVariants(selectedFiles);
  return extractNames.sort((a, b) => a.length - b.length);
};

export const extractVariants = (files) => {
  // template-<variant>-<language>
  return files.map((file) => file.split("-")[1]);
};
