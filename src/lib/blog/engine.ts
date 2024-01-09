import type { Post } from "$lib/blog/post";

export enum Engine {
    GithubDiscussions,
}

export default abstract class BlogEngine {
    abstract findPostBySlug(slug: string): Promise<Post | null>;
    abstract findPosts(): Promise<Post[]>;
}
