<script lang="ts">
    import Time from "svelte-time";

    import Author from "$lib/components/Author.svelte";
    import config from "$lib/config.js";

    import type { PostData } from "./post-types";

    export let data: PostData;
</script>

<svelte:head>
    <title>{data.post.title} - atomicptr.dev</title>
    <meta
        name="description"
        content="post description"
    />
</svelte:head>

<header class="mb-4 lg:mb-6 not-format">
    <Author {...data.post.author}>
        <p class="text-base text-gray-500 dark:text-gray-400">
            <Time
                datetime={data.post.createdAt.toISOString()}
                format="MMM. DD, YYYY"
            />
        </p>
    </Author>

    <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
        {data.post.title}
    </h1>
</header>

<div class="post-content">
    {@html data.post.body}
</div>

<div>
    <script
        src="https://giscus.app/client.js"
        data-repo="{config.githubDiscussions.username}/{config.githubDiscussions.repository}"
        data-repo-id={config.githubDiscussions.repositoryId}
        data-mapping="number"
        data-term={data.post.number}
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="dark"
        data-lang="en"
        crossorigin="anonymous"
        async
    >
    </script>
</div>

<style>
    :global(.post-content figure) {
        padding: 2rem;
        overflow: auto;
    }

    :global(.post-content p) {
        margin-bottom: 1rem;
    }

    :global(.post-content img) {
        margin-left: auto;
        margin-right: auto;
    }
</style>
