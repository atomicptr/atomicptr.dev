<script lang="ts">
    import HeadImages from "$lib/components/HeaderMetaData.svelte";
    import PostList from "$lib/components/PostList.svelte";
    import config from "$lib/config";

    import type { BlogData } from "./blog-types";

    export let data: BlogData;
</script>

<svelte:head>
    <title>Blog | {config.blogTitle}</title>

    <meta
        name="twitter:title"
        content="Blog | {config.blogTitle}"
    />

    <meta
        property="og:title"
        content="Blog | {config.blogTitle}"
    />

    <HeadImages />
</svelte:head>

<PostList posts={data.posts} />
