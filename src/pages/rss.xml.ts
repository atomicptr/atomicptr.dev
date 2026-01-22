import rss from "@astrojs/rss";

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
        import.meta.glob("./blog/_posts/**/*.mdx", {
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

export async function GET() {
    const posts = getAllPosts();
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
