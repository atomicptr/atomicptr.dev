<script lang="ts">
    import groupBy from "object.groupby";

    import type { Post } from "$lib/blog/post";
    import DateJS from "$lib/components/DateJS.svelte";

    export let posts: Post[];

    const groupedByYear = groupBy(posts, post => post.createdAt.getFullYear());
</script>

{#each Object.entries(groupedByYear) as [year, posts]}
    <div class="w-full flex mb-4">
        <div class="w-16"></div>
        <div class="grow text-3xl font-bold">{year}</div>
    </div>

    {#each posts as post}
        <div class="w-full flex mb-4 items-center">
            <div class="min-w-16 text-gray-500">
                <DateJS
                    timestamp={post.createdAt}
                    format="MMM. DD"
                />
            </div>
            <div class="grow">
                <a
                    class="font-bold text-primary hover:text-secondary"
                    href="/blog/{post.slug}"
                    >{post.title}
                </a>
            </div>
        </div>
    {/each}
{/each}
