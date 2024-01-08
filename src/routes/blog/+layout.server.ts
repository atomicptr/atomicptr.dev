import GithubDiscussionsBlogEngine from "$lib/blog/engines/github-discussions";

import type { BlogData } from "./blog-types";

export const prerender = true;

export async function load(): Promise<BlogData> {
    const engine = new GithubDiscussionsBlogEngine();

    const posts = await engine.findPosts();

    return {
        posts,
    };
}
