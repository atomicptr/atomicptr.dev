<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        username: string;
        url?: string;
        avatarUrl: string;
        subline?: string;
        children: Snippet;
    }

    const { username, url, avatarUrl, subline, children }: Props = $props();
</script>

<address class="flex items-center mb-6 not-italic">
    <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
        <img
            class="mr-4 w-16 h-16 rounded-full"
            src={avatarUrl}
            alt={username}
        />
        <div>
            {#if url}
                <a
                    href={url}
                    target="_blank"
                    rel="author"
                    class="text-xl font-bold text-gray-900 dark:text-white"
                >
                    {username}
                </a>
            {:else}
                <span class="text-xl font-bold text-gray-900 dark:text-white">{username}</span>
            {/if}
            {#if subline}
                <p class="text-base text-gray-500 dark:text-gray-400">
                    {subline}
                </p>
            {/if}

            {@render children()}
        </div>
    </div>
</address>
