<script lang="ts">
    import HeaderMetaData from "$lib/components/HeaderMetaData.svelte";
    import PostList from "$lib/components/PostList.svelte";
    import config from "$lib/config";

    import type { TagData } from "../tag-types";

    export let data: TagData;
</script>

<svelte:head>
    <title>#{data.tag}| {config.blogTitle}</title>

    <meta
        name="twitter:title"
        content="#{data.tag} | {config.blogTitle}"
    />

    <meta
        property="og:title"
        content="#{data.tag} | {config.blogTitle}"
    />

    <HeaderMetaData />
</svelte:head>

<PostList posts={data.posts} />
