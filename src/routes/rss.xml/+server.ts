import { findPosts } from "$lib/blog/nimbus";
import { createResponse } from "$lib/rss";

export const prerender = true;

export async function GET() {
    const posts = await findPosts();
    return createResponse(posts);
}
