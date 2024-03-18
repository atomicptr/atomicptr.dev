<script lang="ts">
    import { faTags } from "@fortawesome/free-solid-svg-icons";
    import Giscus from "@giscus/svelte";
    import Fa from "svelte-fa";

    import Author from "$lib/components/Author.svelte";
    import DateJS from "$lib/components/DateJS.svelte";
    import HeaderMetaData from "$lib/components/HeaderMetaData.svelte";
    import PostSeriesBrowser from "$lib/components/PostSeriesBrowser.svelte";
    import config from "$lib/config";
    import { gravatar } from "$lib/gravatar";

    import type { PostData } from "./post-types";

    export let data: PostData;
</script>

<svelte:head>
    <title>{data.post.title} | {config.blogTitle}</title>

    <meta
        name="twitter:title"
        content="{data.post.title} | {config.blogTitle}"
    />

    <meta
        property="og:title"
        content="{data.post.title} | {config.blogTitle}"
    />

    <HeaderMetaData
        description={data.post.description}
        image={data.post.promo_image}
    />
</svelte:head>

<header class="mb-4 lg:mb-6 not-format">
    <Author
        username={data.post.author.name}
        avatarUrl={gravatar(data.post.author.email)}
    >
        <p>
            <DateJS
                timestamp={data.post.created_at}
                format="MMM. DD, YYYY"
            />
        </p>
    </Author>

    <h1 class="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl">
        {data.post.title}
    </h1>
</header>

<PostSeriesBrowser post={data.post} />

<div class="post-content">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html data.post.content}
</div>

<div class="flex justify-center gap-1">
    {#each data.post.tags as tag}
        <a
            class="badge badge-primary hover:badge-secondary gap-2"
            href="/tags/{tag.slug}"
        >
            <Fa icon={faTags} />
            {tag.slug}
        </a>
    {/each}
</div>

<div class="my-4"></div>

<Giscus
    id="comments"
    repo="atomicptr/atomicptr.dev"
    repoId="R_kgDOLCEAgg"
    category="Comments"
    categoryId="DIC_kwDOLCEAgs4CcRWF"
    mapping="pathname"
    strict="1"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="bottom"
    theme="dark"
    lang="en"
    term={`Welcome to ${config.blogTitle}`}
/>

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
