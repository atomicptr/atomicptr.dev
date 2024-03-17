import { findPosts } from "$lib/blog/nimbus";

export async function entries(): Promise<{ id: number; slug: string }[]> {
    const posts = await findPosts();

    return posts.map(({ id, slug }) => ({ id, slug }));
}
