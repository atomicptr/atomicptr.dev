import type { Post } from "$lib/blog/nimbus";

export interface TagData {
    posts: Post[];
    tag: string;
}
