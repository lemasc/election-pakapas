import { existsSync } from "fs";
import { mkdir, readdir } from "fs/promises";
import { join } from "path";
import rimraf from "rimraf";
import { sections } from "./metadata";
// Converts the

const contentSrcDir = join(process.cwd(), "content", "src");
export const contentDir = join(process.cwd(), "content", "dist");

const remove = (path: string) =>
  new Promise<void>((resolve, reject) =>
    rimraf(path, (err) => {
      if (err) reject(err);
      resolve();
    })
  );

async function main() {
  // Remove directory is exist
  if (existsSync(contentDir)) {
    await remove(contentSrcDir);
  }
  await mkdir(contentDir);
  console.log("STEP 01: Verify source directories");
  const thaiSections = Object.values(sections);
  const dirs = (await readdir(contentSrcDir))
    .map((v) => v.replace(/[0-9]. /, ""))
    .filter((v) => {
      const exists = thaiSections.indexOf(v);
      if (!exists) {
        console.warn(`warn: ${v} folder not match any sections. skipping`);
      }
      return exists;
    });
  console.log(dirs);
}

main();
