import BlogEngine from "$lib/blog/engine";
import GithubDiscussionsBlogEngine from "$lib/blog/engines/github-discussions";

export function createBlogEngine(): BlogEngine {
    return new GithubDiscussionsBlogEngine();
}
