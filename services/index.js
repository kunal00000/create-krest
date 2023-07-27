import fs from "fs";
import { join } from "path";

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
