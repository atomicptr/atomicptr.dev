<script lang="ts">
    import config from "$lib/config";
    import { faHeart } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
</script>

<div class="w-full text-center">
    <a
        href={config.supportUrl}
        target="_blank"
        class="btn btn-secondary btn-outline"
    >
        <Fa icon={faHeart} />
        Liked this post? Support me by buying me a coffee :)
    </a>
</div>
