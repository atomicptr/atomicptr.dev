import type { Post } from "$lib/blog/nimbus";
import config from "$lib/config";
import { parseBody } from "$lib/blog/parse";

interface ParsedPost {
    title: string;
    slug: string;
    content: string;
    publishDate: Date;
}

export const createResponse = async (posts: Post[]): Promise<Response> => {
    const parsedPosts: ParsedPost[] = await Promise.all(
        posts.slice(0, config.rssMaxNumberOfPosts).map(async ({ title, content, slug, publish_date }) => ({
            content: await parseBody(content),
            publishDate: new Date(publish_date),
            slug,
            title,
        })),
    );

    const headers = {
        "Cache-Control": "max-age=0, s-maxage=3600",
        "Content-Type": "application/xml",
    };

    const body = rss(parsedPosts);

    return new Response(body, {
        headers,
    });
};

const rss = (posts: ParsedPost[]): string => `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>atomicptr.dev</title>
    <link>${config.domainPrefix}</link>
    <description>${config.description}</description>
    <atom:link href="${config.domainPrefix}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
        .map(
            post => `
        <item>
          <guid>${config.domainPrefix}/blog/${post.slug}/</guid>
          <title>${post.title}</title>
          <description>
            <![CDATA[<a href='${config.domainPrefix}/blog/${post.slug}/'>Check out this post on my blog: ${config.blogTitle}</a><br/><br/><h1>${post.title}</h1>${post.content}]]>
          </description>
          <link>${config.domainPrefix}/blog/${post.slug}/</link>
          <pubDate>${post.publishDate.toUTCString()}</pubDate>
        </item>
      `,
        )
        .join("")}
  </channel>
</rss>`;
