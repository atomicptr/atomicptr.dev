import truncate from "truncate-html";

import { createBlogEngine } from "$lib/blog/create-engine";
import type { Post } from "$lib/blog/post";
import config from "$lib/config";

export async function GET() {
    const engine = createBlogEngine();
    const posts = await engine.findPosts();

    const headers = {
        "Cache-Control": "max-age=0, s-maxage=3600",
        "Content-Type": "application/xml",
    };

    const body = rss(posts);

    return new Response(body, {
        headers,
    });
}

const rss = (
    posts: Post[],
): string => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>atomicptr.dev</title>
    <link>https://atomicptr.dev</link>
    <description>${config.description}</description>
    ${posts
        .map(
            post =>
                `
        <item>
          <title>${post.title}</title>
          <description>${post.description}</description>
          <link>https://atomicptr.dev/blog/${post.slug}/</link>
          <pubDate>${post.createdAt}</pubDate>
          <content:encoded>${truncate(post.body, 250)}
            <div style="margin-top: 50px; font-style: italic;">
              <strong>
                <a href="https://atomicptr.dev/blog/${post.slug}">
                  Keep reading
                </a>
              </strong>
            </div>
          </content:encoded>
        </item>
      `,
        )
        .join("")}
  </channel>
</rss>`;
