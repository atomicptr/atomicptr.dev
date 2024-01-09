<script lang="ts">
    import config from "$lib/config.js";

    export let number: number;
</script>

<div>
    <script
        src="https://giscus.app/client.js"
        data-repo="{config.githubDiscussions.username}/{config.githubDiscussions.repository}"
        data-repo-id={config.githubDiscussions.repositoryId}
        data-mapping="number"
        data-term={number}
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="dark"
        data-lang="en"
        crossorigin="anonymous"
        async
    >
    </script>
</div>
