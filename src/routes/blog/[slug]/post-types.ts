import type { MetaPostSeries, PostDetails } from "$lib/blog/nimbus";

export interface PostData {
    post: PostDetails;
    postSeries: MetaPostSeries | null;
}
