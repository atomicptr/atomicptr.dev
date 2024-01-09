import { type Client, createClient, fetchExchange, gql } from "@urql/core";
import slugify from "slugify";

import { GH_TOKEN } from "$env/static/private";
import BlogEngine from "$lib/blog/engine";
import { parseBody } from "$lib/blog/parse";
import config from "$lib/config";

import type { Post } from "../post";

const queryFindPosts = gql`
    query ($owner: String!, $repository: String!, $limit: Int!, $after: String) {
        repository(owner: $owner, name: $repository) {
            discussions(first: $limit, after: $after, orderBy: { field: CREATED_AT, direction: DESC }) {
                pageInfo {
                    startCursor
                    hasNextPage
                    endCursor
                }
                edges {
                    cursor
                    node {
                        ... on Discussion {
                            id
                            title
                            body
                            createdAt
                            number
                            author {
                                login
                                url
                                avatarUrl
                            }
                            labels(first: 100) {
                                nodes {
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

interface DiscussionsQueryApiResponse {
    data: {
        repository: {
            discussions: {
                edges: {
                    node: DiscussionNode;
                }[];
            };
        };
    };
}

interface DiscussionNode {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    number: number;
    author: {
        login: string;
        url: string;
        avatarUrl: string;
    };
    labels: {
        nodes: {
            name: string;
        }[];
    };
}

export default class GithubDiscussionsBlogEngine extends BlogEngine {
    private client: Client;

    constructor() {
        super();

        if (!GH_TOKEN) {
            throw Error("Could not find Github API Key!");
        }

        this.client = createClient({
            exchanges: [fetchExchange],
            fetchOptions: () => {
                return {
                    headers: {
                        authorization: `Bearer ${GH_TOKEN}`,
                        "user-agent": config.githubDiscussions.repository,
                    },
                };
            },
            requestPolicy: "network-only",
            url: config.githubDiscussions.apiUrl,
        });
    }

    async findPostBySlug(slug: string): Promise<Post | null> {
        // TODO: extremely naive implementation but honestly should i ever have written enough blog posts that this
        //  will cause issues I might as well graduate to a better system. So this is #GoodEnough
        const posts = await this.findPosts();
        return posts.find(post => post.slug === slug) ?? null;
    }

    async findPosts(): Promise<Post[]> {
        const posts: Post[] = [];

        // realistically I doubt i will ever write a hundred posts...
        const max = 100;

        let after = undefined;

        const running = true;

        while (running) {
            const result = (await this.client.query(queryFindPosts, {
                after,
                limit: max,
                owner: config.githubDiscussions.username,
                repository: config.githubDiscussions.repository,
            })) as DiscussionsQueryApiResponse;

            if (!result.data) {
                break;
            }

            if (!result.data.repository.discussions) {
                break;
            }

            if (!result.data.repository.discussions.edges) {
                break;
            }

            for (const node of result.data.repository.discussions.edges) {
                posts.push(await this.parsePost(node.node));
            }

            const last = posts[posts.length - 1];

            after = last.createdAt.toISOString();

            if (result.data.repository.discussions.edges.length < max) {
                break;
            }
        }

        return posts;
    }

    private async parsePost(node: DiscussionNode): Promise<Post> {
        const content = await parseBody(node.body);

        const body = content.body;

        const createdAt = new Date(Date.parse(node.createdAt));

        return {
            author: { avatarUrl: node.author.avatarUrl, url: node.author.url, username: node.author.login },
            body,
            createdAt,
            labels: node.labels.nodes.map(label => label.name),
            number: node.number,
            options: {
                commentsDisabled: content.commentsDisabled,
            },
            slug: content.slug ?? slugify(node.title, { lower: true }),
            title: node.title,
        };
    }
}
