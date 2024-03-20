import { findPosts } from "$lib/blog/nimbus";
import { createResponse } from "$lib/rss";

export const prerender = true;

export async function GET({ params }) {
    const posts = await findPosts();
    return createResponse(posts.filter(post => post.tags.some(tag => tag.slug === params.tag)));
}
