import { error } from "@sveltejs/kit";

import { findPostBySlug } from "$lib/blog/nimbus";

import type { PostData } from "./post-types";

export async function load(data): Promise<PostData> {
    const params = data.params;
    const parent = await data.parent();

    const post = await findPostBySlug(params.slug, parent.posts);

    if (!post) {
        error(404, {
            message: "Not found",
        });
    }

    return {
        post,
    };
}
