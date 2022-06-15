import { existsSync } from "fs";
import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import { dump } from "js-yaml";
import { join } from "path";
import rimraf from "rimraf";
import { sections } from "./metadata";
import { contentDir, contentSrcDir } from "./server/shared";

/**
Strip UTF-8 [byte order mark](https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8) (BOM) from a string.
@example
```
import stripBom from 'strip-bom';
stripBom('\uFEFFunicorn');
//=> 'unicorn'
```
*/
function stripBom(string: string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a string, got ${typeof string}`);
  }

  // Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
  // conversion translates it to FEFF (UTF-16 BOM).
  if (string.charCodeAt(0) === 0xfeff) {
    return string.slice(1);
  }

  return string;
}

type ContentMetadata = {
  title: string;
  tags: string;
};

const remove = (path: string) =>
  new Promise<void>((resolve, reject) =>
    rimraf(path, (err) => {
      if (err) reject(err);
      resolve();
    })
  );

const nameWithoutNumber = (str: string) => str.replace(/[0-9].([0-9]?) /, "");
const stackeditRegex =
  /<!--stackedit_data:(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?-->/;

async function main() {
  // Remove directory is exist
  if (existsSync(contentDir)) {
    await remove(contentDir);
  }
  await mkdir(contentDir);
  console.log("STEP 01: Verify source directories");
  const sectionsObj = Object.entries(sections);
  const dirs = (await readdir(contentSrcDir))
    .map<[string, string?]>((dir) => {
      const thai = nameWithoutNumber(dir);
      return [dir, sectionsObj.find(([key, value]) => value === thai)?.[0]];
    })
    .filter(([dir, value]) => {
      if (dir.includes("git")) return false;
      if (!value) {
        console.warn(`warn: ${dir} folder not match any sections. skipping`);
      }
      return value;
    }) as [string, string][];
  console.log("Creating target destination..");
  console.log(dirs);
  await Promise.all(
    dirs.map(async ([dir, value]) => mkdir(join(contentDir, value)))
  );
  console.log("STEP 02: Generating content files");
  await Promise.all(
    dirs.map(async ([dir, tag]) => {
      const files = (await readdir(join(contentSrcDir, dir))).filter(
        (v) => !v.includes("git")
      );
      await Promise.all(
        files.map(async (file, index) => {
          const location = join(dir, file);
          const source = await readFile(join(contentSrcDir, location), {
            encoding: "utf-8",
          });
          const data: ContentMetadata = {
            title: nameWithoutNumber(file.replace(".md", "")),
            tags: tag,
          };
          console.log(`Processing file: ${location}`);
          const frontmatter = dump(data);
          const content = stripBom(source.replace(stackeditRegex, ""));
          return writeFile(
            join(contentDir, tag, `${index}.mdx`),
            `---\n${frontmatter}---\n\n${content}`
          );
        })
      );
    })
  );
}

main();
