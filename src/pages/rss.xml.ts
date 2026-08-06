import rss from "@astrojs/rss";
import type { Post } from "@src/types";
import { getAllPosts } from "@src/utils/posts";

export async function GET() {
    const posts = await getAllPosts();
    const siteUrl = "https://atomicptr.dev";
    const siteTitle = "dev://atomicptr";
    const siteDescription = "A blog mostly about programming";

    const sortedPosts = posts.sort((a: Post, b: Post) => {
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });

    return rss({
        title: siteTitle,
        description: siteDescription,
        site: siteUrl,
        items: sortedPosts.map((post: Post) => {
            const postUrl = `${siteUrl}/blog/${post.slug}`;

            return {
                title: post.frontmatter.title,
                link: postUrl,
                pubDate: new Date(post.frontmatter.date),
                description: post.frontmatter.description,
                categories: post.frontmatter.tags || [],
                guid: postUrl,
            };
        }),
        customData: `<language>en-us</language>`,
    });
}
