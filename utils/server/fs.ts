import { readdir, readFile } from "fs/promises";
import { basename, join } from "path";
import { sections, Sections } from "../metadata";
import { ContentMetadata, parseMetadata } from "./mdx";
import { load } from "js-yaml";
import { existsSync } from "fs";
import { contentDir } from "./shared";

export const getPoliciesDirs = async () => {
  // We can't simply use `readdir`, because it sort alphabetically.
  // Also we might wanted to filter unknown files as well.
  return Object.keys(sections).filter((folder) =>
    existsSync(join(contentDir, folder))
  ) as Sections[];
};

export const getPoliciesFromDir = async (dir: Sections) => {
  const sectionDir = join(contentDir, dir);
  return readdir(sectionDir).then((files) =>
    files.map((file) => basename(file, ".mdx"))
  );
};

export type PolicyData = {
  content: string;
  metadata: ContentMetadata;
};

const frontmatterRegex =
  /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/;

export async function getPolicy(
  dir: Sections,
  file: string
): Promise<Omit<PolicyData, "content">>;

export async function getPolicy(
  dir: Sections,
  file: string,
  withContent: "partial" | true
): Promise<PolicyData>;
export async function getPolicy(
  dir: Sections,
  file: string,
  withContent?: "partial" | boolean
): Promise<any> {
  const filename = join(contentDir, dir, `${file}.mdx`);
  const source = await readFile(filename, {
    encoding: "utf-8",
  });
  const match = frontmatterRegex.exec(source) as RegExpMatchArray;
  const metadata = parseMetadata(
    match ? load(match[1], { filename }) : null,
    filename
  );
  let content = undefined;
  if (match && withContent) {
    const markdown = source.slice(match[0].length);
    content =
      withContent === "partial"
        ? markdown
            .split("\n")
            .slice(2, 5)
            .reduce((prev, cur) => {
              if (cur !== "" && !cur.startsWith("*")) {
                if (prev.length < 180) {
                  prev = (prev + " " + cur.replaceAll("*", "")).slice(0, 180);
                }
              }
              return prev;
            }, "")
        : markdown;
  }

  return {
    content,
    metadata,
  };
}
