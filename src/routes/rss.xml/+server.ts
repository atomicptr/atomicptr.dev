import { findPosts } from "$lib/blog/nimbus";
import { parseBody } from "$lib/blog/parse";
import config from "$lib/config";

export const prerender = true;

interface ParsedPost {
    title: string;
    slug: string;
    content: string;
    createdAt: Date;
}

export async function GET() {
    const posts = await findPosts();

    const parsedPosts: ParsedPost[] = await Promise.all(
        posts.slice(0, config.rssMaxNumberOfPosts).map(async ({ title, content, slug, created_at }) => ({
            content: await parseBody(content),
            createdAt: new Date(created_at),
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
}

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
          <pubDate>${post.createdAt.toUTCString()}</pubDate>
        </item>
      `,
        )
        .join("")}
  </channel>
</rss>`;
