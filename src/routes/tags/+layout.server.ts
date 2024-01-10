import { createBlogEngine } from "$lib/blog/create-engine";
import type { TagData } from "./tag-types";

export async function load({ params }): Promise<TagData> {
    const engine = createBlogEngine();

    const posts = await engine.findPosts();

    return {
        posts: posts.filter(post => post.labels?.some(label => label === params.tag)),
    };
}
