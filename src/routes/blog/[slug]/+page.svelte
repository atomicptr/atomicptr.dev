<script lang="ts">
    import { faTags } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    import Author from "$lib/components/Author.svelte";
    import CommentSection from "$lib/components/CommentSection.svelte";
    import DateJS from "$lib/components/DateJS.svelte";

    import type { PostData } from "./post-types";

    export let data: PostData;
</script>

<svelte:head>
    <title>{data.post.title} | dev://atomicptr</title>

    <meta
        name="twitter:title"
        content="{data.post.title} | dev://atomicptr"
    />

    <meta
        property="og:title"
        content="{data.post.title} | dev://atomicptr"
    />

    <meta
        name="description"
        content={data.post.description}
    />
    <meta
        name="twitter:description"
        content={data.post.description}
    />
    <meta
        property="og:description"
        content={data.post.description}
    />

    {#if data.post.image}
        <meta
            name="twitter:image"
            content={data.post.image}
        />
        <meta
            property="og:image"
            content={data.post.image}
        />
    {/if}
</svelte:head>

<header class="mb-4 lg:mb-6 not-format">
    <Author {...data.post.author}>
        <p>
            <DateJS
                timestamp={data.post.createdAt}
                format="MMM. DD, YYYY"
            />
        </p>
    </Author>

    <h1 class="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl">
        {data.post.title}
    </h1>
</header>

<div class="post-content">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.post.body}
</div>

<div class="flex justify-center gap-1">
    {#each data.post.labels as label}
        <a
            class="badge badge-primary hover:badge-secondary gap-2"
            href="/tags/{label}"
        >
            <Fa icon={faTags} />
            {label}
        </a>
    {/each}
</div>

<div class="my-4"></div>

<CommentSection number={data.post.number} />

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

    :global(.post-content h2) {
        font-size: 30px;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-weight: bold;
    }

    :global(.post-content h3) {
        font-size: 20px;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-weight: bold;
    }

    :global(.post-content ul) {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    :global(.post-content li) {
        margin-left: 4rem;
        list-style: disc;
    }

    :global(.post-content a) {
        font-weight: bold;
        color: oklch(var(--p));

        &:hover {
            color: oklch(var(--s));
        }
    }
</style>
