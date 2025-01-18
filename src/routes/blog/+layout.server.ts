import { findPosts } from "$lib/blog/nimbus";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    const posts = await findPosts();

    return {
        posts,
    };
};
