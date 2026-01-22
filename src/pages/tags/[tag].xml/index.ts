import rss from "@astrojs/rss";
import config from "../../../config";

interface Post {
    slug?: string;
    file: string;
    frontmatter: {
        title: string;
        description?: string;
        date: string;
        tags?: string[];
    };
}

function getSlugFromFilePath(filePath: string): string {
    return filePath
        .split("/")
        .pop()!
        .replace(/\.mdx$/, "");
}

function getAllPosts(): Post[] {
    const posts: Post[] = Object.values(
        import.meta.glob("../../blog/_posts/**/*.mdx", {
            eager: true,
        }),
    );

    return posts.map((post: Post) => {
        const slug = getSlugFromFilePath(post.file);
        return {
            ...post,
            slug: post.slug ?? slug,
        };
    });
}

export async function GET({ params }: { params: { tag: string } }) {
    const tag = params.tag;
    const siteUrl = config.domain;
    const siteTitle = config.title;

    const posts = getAllPosts();

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
            const slug = post.slug || getSlugFromFilePath(post.file);
            const postUrl = `${siteUrl}/blog/${slug}`;
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

export function getStaticPaths() {
    const posts = getAllPosts();
    const uniqueTags = [
        ...new Set(
            posts.map((post: Post) => post.frontmatter.tags ?? []).flat(),
        ),
    ];

    return uniqueTags.map((tag) => ({
        params: { tag },
    }));
}
