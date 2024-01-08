import type { Post } from "$lib/blog/post";

export default abstract class BlogEngine {
    abstract findPostBySlug(slug: string): Promise<Post | null>;
    abstract findPosts(): Promise<Post[]>;
}
