import type { Post } from "@src/types";
import { getCollection } from "astro:content";

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

export function getSlugFromFilePath(filePath: string): string {
    return filePath
        .split("/")
        .pop()!
        .replace(/\.(md|mdx)$/, "");
}

export async function getAllPosts(): Promise<Post[]> {
    const posts = await getCollection("blog");

    return posts.map((post) => {
        const file = post.filePath ?? post.id;
        const slug = getSlugFromFilePath(file);

        return {
            file,
            frontmatter: post.data,
            ...post,
            slug: post.slug ?? slug,
        };
    });
}

export async function getPostSeries(currentSlug: string): Promise<PostSeries> {
    const allPosts = await getAllPosts();
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
