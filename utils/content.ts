export const partialContent = (markdown: string): string => {
  return markdown
    .split("\n")
    .slice(2, 5)
    .reduce((prev, cur) => {
      if (cur !== "" && !cur.startsWith("*")) {
        if (prev.length < 180) {
          prev = prev + " " + cur.replace(/\*/g, "");
          if (prev.length > 180) {
            prev = prev.slice(0, 210).split(" ").slice(0, -1).join(" ");
          }
        }
      }
      return prev;
    }, "")
    .trim();
};
