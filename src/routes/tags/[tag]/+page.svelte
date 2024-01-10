<script lang="ts">
    import PostList from "$lib/components/PostList.svelte";

    import type { TagData } from "../tag-types";

    export let data: TagData;
</script>

<svelte:head>
    <title>#{data.tag}| dev://atomicptr</title>

    <meta
        name="twitter:title"
        content="#{data.tag} | dev://atomicptr"
    />

    <meta
        property="og:title"
        content="#{data.tag} | dev://atomicptr"
    />
</svelte:head>

<PostList posts={data.posts} />
