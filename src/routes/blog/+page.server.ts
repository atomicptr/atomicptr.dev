import { createBlogEngine } from "$lib/blog/create-engine";

export async function entries(): Promise<{ slug: string }[]> {
    const engine = createBlogEngine();

    const posts = await engine.findPosts();

    return posts.map(({ slug }) => ({ slug }));
}
