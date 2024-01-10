import BlogEngine from "$lib/blog/engine";
import GithubDiscussionsBlogEngine from "$lib/blog/engines/github-discussions";

let engine: BlogEngine;

export function createBlogEngine(): BlogEngine {
    if (engine) {
        return engine;
    }

    engine = new GithubDiscussionsBlogEngine();
    return engine;
}
