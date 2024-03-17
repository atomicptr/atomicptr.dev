import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGemoji from "remark-gemoji";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function parseBody(content: string): Promise<string> {
    const file = await unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify)
        .use(rehypePrettyCode, {
            keepBackground: true,
            theme: "github-dark-dimmed",
        })
        .use(remarkGemoji)
        .process(content);

    return file.toString();
}
