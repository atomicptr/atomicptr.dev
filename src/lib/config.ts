import { Engine } from "$lib/blog/engine";

export default {
    description: "A blog primarily about programming",
    engine: Engine.GithubDiscussions,
    githubDiscussions: {
        apiUrl: "https://api.github.com/graphql",
        repository: "atomicptr.dev",
        repositoryId: "R_kgDOLCEAgg",
        username: "atomicptr",
    },
};
