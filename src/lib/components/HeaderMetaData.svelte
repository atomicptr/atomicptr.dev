<script lang="ts">
    import config from "$lib/config";

    export let description: string | null = null;

    export let image: string | null = null;
</script>

<meta
    name="twitter:card"
    content="summary"
/>

<meta
    name="description"
    content={description ?? config.description}
/>

<meta
    name="twitter:description"
    content={description ?? config.description}
/>

<meta
    property="og:description"
    content={description ?? config.description}
/>

<meta
    name="twitter:image"
    content={image ?? `${config.domainPrefix}/social.jpg`}
/>

<meta
    property="og:image"
    content={image ?? `${config.domainPrefix}/social.jpg`}
/>
