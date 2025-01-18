<script lang="ts">
    import groupBy from "object.groupby";

    import type { Post } from "$lib/blog/nimbus";
    import DateJS from "$lib/components/DateJS.svelte";

    interface Props {
        posts: Post[];
    }

    const { posts }: Props = $props();

    const groupedByYear = groupBy(posts, post => new Date(post.publish_date).getFullYear());
    const groupedByYearArray = Object.keys(groupedByYear)
        .map(year => ({ posts: groupedByYear[year as unknown as keyof typeof groupedByYear], year }))
        .sort((a, b) => a.year.localeCompare(b.year))
        .reverse();
</script>

{#each groupedByYearArray as { year, posts }}
    <div class="w-full flex mb-4">
        <div class="w-16"></div>
        <div class="grow text-3xl font-bold">{year}</div>
    </div>

    {#each posts as post}
        <div class="w-full flex mb-4 items-center">
            <div class="min-w-16 text-gray-500">
                <DateJS
                    timestamp={new Date(post.publish_date)}
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
