<script lang="ts">
    import type { Post, PostDetails } from "$lib/blog/nimbus";

    export let post: PostDetails | null = null;

    const isBeforeCurrentPost = (p: Post) =>
        post === null ? true : new Date(p.publish_date) < new Date(post.publish_date);
</script>

{#if post && post.post_series}
    <div class="post-series-browser p-4 pl-8 mb-4 border-primary">
        <div class="mb-2">
            <div class="text-2xl">{post.post_series.title}</div>
            {#if post.post_series.description}
                <div>
                    {post.post_series.description}
                </div>
            {/if}
        </div>

        <ul class="steps steps-vertical">
            {#each post.post_series.posts as p}
                <li
                    class="step"
                    class:step-primary={isBeforeCurrentPost(p) || p.id === post.id}
                >
                    {#if p.id === post.id}
                        <strong>{p.title}</strong>
                    {:else}
                        <a href="/blog/{p.slug}">{p.title}</a>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
{/if}

<style>
    .post-series-browser {
        border-left: 2px solid oklch(var(--p));
    }
</style>
