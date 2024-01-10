<script lang="ts">
    import groupBy from "object.groupby";

    import DateJS from "$lib/components/DateJS.svelte";

    import type { BlogData } from "./blog-types";

    export let data: BlogData;

    const groupedByYear = groupBy(data.posts, post => post.createdAt.getFullYear());
</script>

<svelte:head>
    <title>Blog | dev://atomicptr</title>

    <meta
        name="twitter:title"
        content="Blog | dev://atomicptr"
    />

    <meta
        property="og:title"
        content="Blog | dev://atomicptr"
    /></svelte:head
>

{#each Object.entries(groupedByYear) as [year, posts]}
    <div class="text-4xl mb-6">{year}</div>

    <div class="w-full">
        {#each posts as post}
            <div class="flex">
                <div class="text-gray-400 w-1/12 hidden lg:flex">
                    <DateJS
                        timestamp={post.createdAt}
                        format="MMM. DD"
                    />
                </div>
                <div class="grow">
                    <a
                        class="font-bold text-primary"
                        href="/blog/{post.slug}">{post.title}</a
                    >
                </div>
            </div>
        {/each}
    </div>
{/each}
