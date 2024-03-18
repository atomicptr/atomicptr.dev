<script lang="ts">
    import { faLink } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    import type { PostDetails } from "$lib/blog/nimbus";

    export let post: PostDetails;
</script>

{#if post.links}
    <div class="my-8">
        <div class="text-2xl">
            Links
        </div>

        <div class="flex flex-col items-center w-full">
            {#each post.links as link}
                <div class="my-2 w-full max-w-lg">
                    <a class="btn btn-dark w-full h-auto p-4" href="{link.link}" target="_blank">
                        <Fa icon={faLink} size="lg" />
                        <div class="flex flex-col text-left">
                            <span class="text-xl">{link.title}</span>
                            {#if link.description}
                                <small class="text-sm">{link.description}</small>
                            {/if}
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    </div>
{/if}
