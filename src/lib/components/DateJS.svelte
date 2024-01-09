<script lang="ts">
    import dayjs from "dayjs";

    export let timestamp: Date | string | number | null | undefined;
    export let format: string;
</script>

{#if timestamp}
    {dayjs(timestamp).format(format)}
{/if}
