<script lang="ts">
    import "../app.css";

    import Footer from "$lib/components/Footer.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import config from "$lib/config";
</script>

<svelte:head>
    <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS"
        href="{config.domainPrefix}/rss.xml"
    />

    <meta
        name="twitter:card"
        content="summary"
    />
    <meta
        name="description"
        content={config.description}
    />
    <meta
        name="twitter:description"
        content={config.description}
    />
    <meta
        property="og:description"
        content={config.description}
    />
</svelte:head>

<div class="app">
    <div class="flex justify-between mx-auto max-w-screen-xl">
        <Navbar />
    </div>

    <div class="flex justify-between px-4 mx-auto max-w-screen-xl">
        <main class="my-8 w-full">
            <slot />
        </main>
    </div>

    <footer>
        <Footer />
    </footer>
</div>
