import rss from "@astrojs/rss";
import config from "@src/config";
import type { Post } from "@src/types";
import { getAllPosts } from "@src/utils/posts";

export async function GET({ params }: { params: { tag: string } }) {
    const tag = params.tag;
    const siteUrl = config.domain;
    const siteTitle = config.title;
    const posts = await getAllPosts();

    const filteredPosts = posts
        .filter((post: Post) => post.frontmatter.tags?.includes(tag))
        .sort((a: Post, b: Post) => {
            return (
                new Date(b.frontmatter.date).getTime() -
                new Date(a.frontmatter.date).getTime()
            );
        });

    return rss({
        title: `${siteTitle} - #${tag}`,
        description: `Posts tagged with #${tag}`,
        site: siteUrl,
        items: filteredPosts.map((post: Post) => {
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

export async function getStaticPaths() {
    const posts = await getAllPosts();
    const uniqueTags = [
        ...new Set(posts.flatMap((post: Post) => post.frontmatter.tags ?? [])),
    ];

    return uniqueTags.map((tag) => ({
        params: { tag },
    }));
}
