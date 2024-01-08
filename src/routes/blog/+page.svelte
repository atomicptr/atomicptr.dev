<script lang="ts">
    import groupBy from "object.groupby";
    import Time from "svelte-time";

    import type { BlogData } from "./blog-types";

    export let data: BlogData;

    const groupedByYear = groupBy(data.posts, post => post.createdAt.getFullYear());
</script>

{#each Object.entries(groupedByYear) as [year, posts]}
    <div class="text-4xl mb-6">{year}</div>

    <div class="w-full">
        {#each posts as post}
            <div class="flex">
                <div class="text-gray-400 w-1/12">
                    <Time
                        datetime={post.createdAt.toISOString()}
                        format="MMM, DD"
                    />
                </div>
                <div class="grow">
                    <a
                        class="font-bold"
                        href="/blog/{post.slug}">{post.title}</a
                    >
                </div>
            </div>
        {/each}
    </div>
{/each}
