import { findPosts } from "$lib/blog/nimbus";

import type { BlogData } from "./blog-types";

export async function load(): Promise<BlogData> {
    const posts = await findPosts();

    return {
        posts,
    };
}
