import matter from "gray-matter";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";

export interface MarkdownContent {
    body: string;
    slug?: string;
    commentsDisabled: boolean;
}

export async function parseBody(markdown: string): Promise<MarkdownContent> {
    const content: MarkdownContent = {
        body: markdown,
        commentsDisabled: false,
        slug: undefined,
    };

    // attempt to parse front matter if not available ignore
    try {
        const { data: frontmatter, content: markdownText } = matter(content.body);
        content.body = markdownText;

        if (frontmatter && frontmatter.slug) {
            content.slug = frontmatter.slug;
        }

        if (frontmatter && frontmatter.commentsDisabled) {
            content.commentsDisabled = frontmatter.commentsDisabled;
        }
    } catch (ex) {
        /* empty */
    }

    const file = await unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify)
        .use(rehypePrettyCode, {
            theme: "github-dark-dimmed",
            keepBackground: true,
        })
        .process(content.body);

    content.body = file.toString();

    return content;
}
