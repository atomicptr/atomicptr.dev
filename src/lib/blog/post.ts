export interface Post {
    title: string;
    body: string;
    slug: string;
    author: {
        username: string;
        url: string;
        avatarUrl: string;
    };
    labels: string[];
    createdAt: Date;
    options: {
        commentsDisabled: boolean;
        draft: boolean;
    };
    number: number;
    description?: string;
    image?: string;
}
