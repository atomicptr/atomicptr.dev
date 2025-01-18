import { findPosts } from "$lib/blog/nimbus";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
    const posts = await findPosts();

    return {
        posts: posts.filter(post => post.tags?.some(tag => tag.slug === params.tag)),
        tag: params.tag ?? "",
    };
};
