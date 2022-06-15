import { join } from "path";
const contentSrcDir = join(process.cwd(), "content", "src");
const contentDir = join(process.cwd(), "content", "dist");

export { contentDir, contentSrcDir };
