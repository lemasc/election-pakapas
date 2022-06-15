import { readdir, readFile } from "fs/promises";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { basename, join } from "path";
import { sections, Sections } from "../metadata";
import { ContentMetadata, parseMetadata } from "./mdx";
import { load } from "js-yaml";
import { existsSync } from "fs";
import { contentDir } from "../build-content";

export { contentDir };

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
  content: MDXRemoteSerializeResult;
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
  withContent: true
): Promise<PolicyData>;

export async function getPolicy(
  dir: Sections,
  file: string,
  withContent?: boolean
): Promise<any> {
  const filename = join(contentDir, dir, `${file}.mdx`);
  const source = await readFile(filename, {
    encoding: "utf-8",
  });
  const match = frontmatterRegex.exec(source);
  const metadata = parseMetadata(
    match ? load(match[1], { filename }) : null,
    filename
  );
  let content = undefined;
  if (match && withContent) {
    const { compiledSource, scope } = await serialize(
      source.slice(match[0].length)
    );
    content = { compiledSource, scope };
  }

  return {
    content,
    metadata,
  };
}
