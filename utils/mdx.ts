import { join } from "path";

export const contentDir = join(process.cwd(), "content");
export type ContentMetadata = {
  title: string;
  tags: string[];
};

const isString = (v: any): v is string => v !== null && typeof v === "string";
const isObject = (v: any): v is Record<string, unknown> =>
  v !== null && typeof v === "object" && !Array.isArray(Object);

export const parseMetadata = (
  frontmatter: unknown,
  name: string
): ContentMetadata => {
  if (!frontmatter) {
    throw new Error(`Frontmatter metadata not found for file: ${name}`);
  }
  if (
    isObject(frontmatter) &&
    isString(frontmatter.title) &&
    isString(frontmatter.tags)
  ) {
    return {
      title: frontmatter.title,
      tags: frontmatter.tags.split(",").map((v) => v.trim()),
    };
  }
  throw new Error(`Invalid frontmatter syntax for file: ${name}`);
};
