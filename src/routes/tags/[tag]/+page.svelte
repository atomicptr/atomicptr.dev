<script lang="ts">
    import groupBy from "object.groupby";

    import DateJS from "$lib/components/DateJS.svelte";

    import type { TagData } from "../tag-types";

    export let data: TagData;

    const groupedByYear = groupBy(data.posts, post => post.createdAt.getFullYear());
</script>

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
                        class="font-bold text-primary hover:text-secondary"
                        href="/blog/{post.slug}">{post.title}</a
                    >
                </div>
            </div>
        {/each}
    </div>
{/each}
