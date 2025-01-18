<script lang="ts">
    import HeadImages from "$lib/components/HeaderMetaData.svelte";
    import PostList from "$lib/components/PostList.svelte";
    import config from "$lib/config";
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props();
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
