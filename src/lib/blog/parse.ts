import matter from "gray-matter";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export interface MarkdownContent {
    body: string;
    slug?: string;
    commentsDisabled: boolean;
    description?: string;
    image?: string;
}

export async function parseBody(markdown: string): Promise<MarkdownContent> {
    const content: MarkdownContent = {
        body: markdown,
        commentsDisabled: false,
        description: undefined,
        image: undefined,
        slug: undefined,
    };

    // attempt to parse front matter if not available ignore
    try {
        const { data: frontmatter, content: markdownText } = matter(content.body);
        content.body = markdownText;

        if (frontmatter && frontmatter.slug) {
            content.slug = frontmatter.slug;
        }

        if (frontmatter && frontmatter.description) {
            content.description = frontmatter.description;
        }

        if (frontmatter && frontmatter.image) {
            content.image = frontmatter.image;
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
            keepBackground: true,
            theme: "github-dark-dimmed",
        })
        .process(content.body);

    content.body = file.toString();

    return content;
}
