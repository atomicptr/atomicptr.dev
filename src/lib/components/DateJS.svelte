<script lang="ts">
    import dayjs from "dayjs";

    interface Props {
        timestamp?: Date | string | number | null | undefined;
        format: string;
    }

    const { timestamp, format }: Props = $props();
</script>

{#if timestamp}
    {dayjs(timestamp).format(format)}
{/if}
