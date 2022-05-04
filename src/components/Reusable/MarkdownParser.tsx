import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

export type MarkdownParserPropsType = {
  children: string;
};

const MarkdownParser: React.FC<MarkdownParserPropsType> = ({ children }) => {
  // *************** RENDER *************** //
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} skipHtml={false}>
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownParser;
