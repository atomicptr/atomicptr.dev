<script lang="ts">
    import { faRss } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

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

<div class="flex justify-end">
    <a
        class="btn btn-ghost"
        href="/tags/{data.tag}/rss.xml"
        target="_blank"
    >
        <Fa icon={faRss} />
        <span>
            #{data.tag}
        </span>
    </a>
</div>

<PostList posts={data.posts} />
