<script lang="ts">
    import PostList from "$lib/components/PostList.svelte";

    import type { BlogData } from "./blog-types";

    export let data: BlogData;
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
    />
</svelte:head>

<PostList posts={data.posts} />
