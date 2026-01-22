export interface PostContent {
    title: string;
    description?: string;
    date: string;
    image?: {
        src: string;
        caption: string?;
    };
    links?: Link[];
    tags?: string[];
}

export interface Post {
    slug?: string;
    file: string;
    frontmatter: PostContent;
    Content: any?;
}

export interface Link {
    name: string;
    url: string;
}

