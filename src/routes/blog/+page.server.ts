import GithubDiscussionsBlogEngine from "$lib/blog/engines/github-discussions";

export async function entries(): Promise<{ slug: string }[]> {
    const engine = new GithubDiscussionsBlogEngine();

    const posts = await engine.findPosts();

    return posts.map(({ slug }) => ({ slug }));
}
