import { createBlogEngine } from "$lib/blog/create-engine";

import type { BlogData } from "./blog-types";

export async function load(): Promise<BlogData> {
    const engine = createBlogEngine();

    const posts = await engine.findPosts();

    return {
        posts,
    };
}
