import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";

export default function Markdown(props: ReactMarkdownOptions) {
  return (
    <ReactMarkdown
      className="content"
      components={useMemo(
        () => ({
          li: ({ node, ordered, children, ...props }) => (
            <li {...props}>
              <div className="content-sublist">{children}</div>
            </li>
          ),
        }),
        []
      )}
      {...props}
    />
  );
}
