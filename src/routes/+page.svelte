<script lang="ts">
    import HeaderMetaData from "$lib/components/HeaderMetaData.svelte";
    import config from "$lib/config";
</script>

<svelte:head>
    <title>Home | {config.blogTitle}</title>

    <meta
        name="twitter:title"
        content="Home | {config.blogTitle}"
    />

    <meta
        property="og:title"
        content="Home | {config.blogTitle}"
    />

    <HeaderMetaData />
</svelte:head>

<div class="hero min-h-screen">
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-xl">
            <h1 class="mb-5 text-5xl font-bold">Hello I'm <span class="text-primary">Christopher</span>!</h1>
            <p class="mb-5">👷🏻‍♂️ Software Artisan・🥋 BJJ Practioner・🐧 Linux Enthusiast・🇩🇪🏴󠁧󠁢󠁥󠁮󠁧󠁿🇯🇵</p>
        </div>
    </div>
</div>
