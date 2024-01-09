<script lang="ts">
    import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
    import { derived } from "svelte/store";
    import Fa from "svelte-fa";

    import { page } from "$app/stores";
    import Logo from "$lib/components/Logo.svelte";

    enum ActiveArea {
        Home,
        Blog,
    }

    const active = derived([page], ([page]) =>
        (page.route.id ?? "").startsWith("/blog") ? ActiveArea.Blog : ActiveArea.Home,
    );

    const renderActive = (active: ActiveArea, area: ActiveArea) =>
        active === area ? "btn-primary btn-outline" : "btn-ghost";
</script>

<div class="navbar bg-base-100">
    <div class="navbar-start">
        <a
            class="btn btn-ghost text-xl"
            href="/"
        >
            <Logo />
        </a>
    </div>
    <div class="navbar-center gap-2">
        <a
            class="btn text-xl uppercase {renderActive($active, ActiveArea.Home)}"
            href="/">Home</a
        >
        <a
            class="btn text-xl uppercase {renderActive($active, ActiveArea.Blog)}"
            href="/blog">Blog</a
        >
    </div>
    <div class="navbar-end">
        <a
            class="btn btn-ghost btn-circle"
            href="https://github.com/atomicptr"
            target="_blank"
            title="Github"
        >
            <Fa
                icon={faGithub}
                size="lg"
            />
        </a>
        <a
            class="btn btn-ghost text-xl"
            href="https://x.com/atomicptr"
            target="_blank"
            title="X"
        >
            <Fa icon={faXTwitter} />
        </a>
    </div>
</div>
