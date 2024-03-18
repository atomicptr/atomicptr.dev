<script lang="ts">
    import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    import type { MetaPostSeries } from "$lib/blog/nimbus";

    export let postSeries: MetaPostSeries | null = null;
</script>

{#if postSeries}
    <div class="flex flex-wrap justify-between my-8">
        {#if postSeries.previous}
            <div class="w-full md:w-auto mt-2">
                <a
                    href="/blog/{postSeries.previous.slug}"
                    class="btn w-full md:w-auto gap-2 lg:gap-3"
                >
                    <Fa
                        icon={faChevronLeft}
                        size="lg"
                    />
                    <div class="flex flex-col items-start">
                        <span class="text-base-content/50 hidden text-xs font-normal md:block"> Previous </span>
                        <span>{postSeries.previous.title}</span>
                    </div>
                </a>
            </div>
        {:else}
            <div></div>
        {/if}

        {#if postSeries.next}
            <div class="w-full md:w-auto mt-2">
                <a
                    href="/blog/{postSeries.next.slug}"
                    class="btn btn-neutral w-full md:w-auto gap-2 lg:gap-3"
                >
                    <div class="flex flex-col items-end">
                        <span class="text-neutral-content/50 hidden text-xs font-normal md:block"> Next </span>
                        <span>{postSeries.next.title}</span>
                    </div>
                    <Fa
                        icon={faChevronRight}
                        size="lg"
                    />
                </a>
            </div>
        {:else}
            <div></div>
        {/if}
    </div>
{/if}
