import { error } from "@sveltejs/kit";

import { findPostBySlug, findPosts } from "$lib/blog/nimbus";

import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = async () => {
    const posts = await findPosts();

    return posts.map(({ id, slug }) => ({ id, slug }));
};

export const load: PageServerLoad = async ({ params, parent }) => {
    const parentData = await parent();

    const response = await findPostBySlug(params.slug, parentData.posts);

    if (!response) {
        error(404, {
            message: "Not found",
        });
    }

    return {
        ...response,
    };
};
