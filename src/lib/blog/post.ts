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
    updatedAt: Date;
    options: {
        commentsDisabled: boolean;
    };
    number: number;
}
