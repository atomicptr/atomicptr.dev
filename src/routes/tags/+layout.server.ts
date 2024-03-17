import { findPosts } from "$lib/blog/nimbus";

import type { TagData } from "./tag-types";

export async function load({ params }): Promise<TagData> {
    const posts = await findPosts();

    return {
        posts: posts.filter(post => post.tags?.some(tag => tag.slug === params.tag)),
        tag: params.tag ?? "",
    };
}
