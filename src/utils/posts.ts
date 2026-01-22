import type { Post } from "../types";

export interface SeriesPost {
    title: string;
    slug: string;
    isCurrent: boolean;
    position: number;
    total: number;
}

export interface PostSeries {
    posts: SeriesPost[];
    hasSeries: boolean;
}

function getSlugFromFilePath(filePath: string): string {
    return filePath
        .split("/")
        .pop()!
        .replace(/\.mdx$/, "");
}

export function getAllPosts(): Post[] {
    const posts: Post[] = Object.values(
        import.meta.glob("../pages/blog/_posts/**/*.mdx", {
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

export function getPostSeries(currentSlug: string): PostSeries {
    const allPosts = getAllPosts();
    const postsMap = new Map<string, Post>();

    for (const post of allPosts) {
        const postSlug = post.slug ?? getSlugFromFilePath(post.file);
        postsMap.set(postSlug, post);
    }

    const currentPost = postsMap.get(currentSlug);
    if (!currentPost) {
        return { posts: [], hasSeries: false };
    }

    const currentFrontmatter = currentPost.frontmatter;
    if (!currentFrontmatter.prev && !currentFrontmatter.next) {
        return { posts: [], hasSeries: false };
    }

    const seriesPosts: SeriesPost[] = [];

    let prevSlug: string | undefined = currentFrontmatter.prev;
    let nextSlug: string | undefined = currentFrontmatter.next;

    while (prevSlug && postsMap.has(prevSlug)) {
        const prevPost = postsMap.get(prevSlug)!;
        const prevPostSlug =
            prevPost.slug ?? getSlugFromFilePath(prevPost.file);
        const prevFrontmatter = prevPost.frontmatter;

        seriesPosts.unshift({
            title: prevFrontmatter.title,
            slug: prevPostSlug,
            isCurrent: false,
            position: 0,
            total: 0,
        });

        prevSlug = prevFrontmatter.prev;
    }

    const currentPostSlug =
        currentPost.slug ?? getSlugFromFilePath(currentPost.file);
    seriesPosts.push({
        title: currentFrontmatter.title,
        slug: currentPostSlug,
        isCurrent: true,
        position: 0,
        total: 0,
    });

    while (nextSlug && postsMap.has(nextSlug)) {
        const nextPost = postsMap.get(nextSlug)!;
        const nextPostSlug =
            nextPost.slug ?? getSlugFromFilePath(nextPost.file);
        const nextFrontmatter = nextPost.frontmatter;

        seriesPosts.push({
            title: nextFrontmatter.title,
            slug: nextPostSlug,
            isCurrent: false,
            position: 0,
            total: 0,
        });

        nextSlug = nextFrontmatter.next;
    }

    const total = seriesPosts.length;
    for (let i = 0; i < total; i++) {
        seriesPosts[i] = {
            ...seriesPosts[i],
            position: i + 1,
            total,
        };
    }

    return {
        posts: seriesPosts,
        hasSeries: true,
    };
}
