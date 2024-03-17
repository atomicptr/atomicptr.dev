import { NIMBUS_API_KEY, NIMBUS_BASE_URL, NIMBUS_BLOG_ID } from "$env/static/private";
import { parseBody } from "$lib/blog/parse";

export interface PostResponse {
    data: Post[];
    links: Pagination;
    meta: Meta;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    description: string | null;
    post_series_id?: number;
    author_id: number;
    promo_image: string;
    created_at: string;
    updated_at: string;
    tags: {
        id: number;
        title: string;
        slug: string;
        description: string;
    }[];
}

export interface PostDetails extends Post {
    contentParsed: string | null;
    author: {
        id: number;
        name: string;
        email: string;
    };
    links: {
        id: number;
        title: string;
        description: string | null;
        link: string;
        archive_link: string | null;
        post_id: number;
    }[];
}

export interface Pagination {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url?: string;
        label: string;
        active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

const fetchNimbusApi = async <T>(resourceUrl: string, page?: number): Promise<T> => {
    resourceUrl = resourceUrl.startsWith("/") ? resourceUrl : `/${resourceUrl}`;
    const pagePart = page ? `&page=${page}` : "";
    const data = await fetch(
        `${NIMBUS_BASE_URL}/api/blogs/${NIMBUS_BLOG_ID}${resourceUrl}?api_key=${NIMBUS_API_KEY}${pagePart}`,
    );
    return await data.json();
};

export const findPosts = async (): Promise<Post[]> => {
    const posts: Post[] = [];

    let page = 1;

    const running = true;
    while (running) {
        const response = await fetchNimbusApi<PostResponse>("/posts", page);

        response.data.forEach(post => posts.push(post));

        if (!response.links.next) {
            break;
        }

        page += 1;
    }

    return posts;
};

export const findPostBySlug = async (slug: string, posts?: Post[]): Promise<PostDetails | null> => {
    if (typeof posts === "undefined") {
        posts = await findPosts();
    }

    const post = posts.find(p => p.slug === slug);

    if (!post) {
        return null;
    }

    const response = await fetchNimbusApi<{ data: PostDetails }>(`/posts/${post.id}`);
    const postDetails = response.data;
    postDetails.content = await parseBody(postDetails.content);
    return postDetails;
};
