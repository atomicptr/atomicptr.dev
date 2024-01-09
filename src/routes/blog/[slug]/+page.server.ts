import { error } from "@sveltejs/kit";

import { createBlogEngine } from "$lib/blog/create-engine";

import type { PostData } from "./post-types";

export async function load({ params }): Promise<PostData> {
    const engine = createBlogEngine();

    const post = await engine.findPostBySlug(params.slug);

    if (!post) {
        error(404, {
            message: "Not found",
        });
    }

    return {
        post,
    };
}
