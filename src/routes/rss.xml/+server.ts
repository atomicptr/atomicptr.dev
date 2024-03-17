import { findPosts, type Post } from "$lib/blog/nimbus";
import config from "$lib/config";

export const prerender = true;

export async function GET() {
    const posts = await findPosts();

    const headers = {
        "Cache-Control": "max-age=0, s-maxage=3600",
        "Content-Type": "application/xml",
    };

    const body = rss(posts);

    return new Response(body, {
        headers,
    });
}

const rss = (posts: Post[]): string => `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>atomicptr.dev</title>
    <link>${config.domainPrefix}</link>
    <description>${config.description}</description>
    <atom:link href="${config.domainPrefix}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
        .map(
            post =>
                `
        <item>
          <guid>${config.domainPrefix}/blog/${post.slug}/</guid>
          <title>${post.title}</title>
          ${post.description ? `<description>${post.description}</description>` : ""}
          <link>${config.domainPrefix}/blog/${post.slug}/</link>
          <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
        </item>
      `,
        )
        .join("")}
  </channel>
</rss>`;
