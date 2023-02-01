import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeMathjaxBrowser from "rehype-mathjax/browser";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import remarkParse from "remark-parse";
import cmake from "highlight.js/lib/languages/cmake";

export async function mdToHtml(content: string) {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathjaxBrowser)
    .use(rehypeHighlight, { languages: { cmake } })
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();
  return contentHtml;
}
