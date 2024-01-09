import { error } from "@sveltejs/kit";

import GithubDiscussionsBlogEngine from "$lib/blog/engines/github-discussions";

import type { PostData } from "./post-types";

export async function load({ params }): Promise<PostData> {
    const engine = new GithubDiscussionsBlogEngine();

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
