<script lang="ts">
    import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
    import { faEllipsis, faHeart, faHome, faLayerGroup, faNewspaper, faRss } from "@fortawesome/free-solid-svg-icons";
    import { derived } from "svelte/store";
    import Fa from "svelte-fa";

    import { page } from "$app/stores";
    import Logo from "$lib/components/Logo.svelte";
    import config from "$lib/config";

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

    <!-- desktop nav -->
    <div class="navbar-center gap-2 hidden lg:flex">
        <a
            class="btn text-xl uppercase {renderActive($active, ActiveArea.Home)}"
            href="/">Home</a
        >
        <a
            class="btn text-xl uppercase {renderActive($active, ActiveArea.Blog)}"
            href="/blog">Blog</a
        >
    </div>
    <div class="navbar-end hidden lg:flex">
        <a
            class="btn btn-ghost btn-circle"
            href={config.githubUrl}
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
            href={config.xUrl}
            target="_blank"
            title="X"
        >
            <Fa icon={faXTwitter} />
        </a>
        <a
            class="btn btn-ghost text-xl"
            href={config.supportUrl}
            target="_blank"
            title="Support Me"
        >
            <Fa icon={faHeart} />
        </a>
        <a
            class="btn btn-ghost text-xl"
            href="/rss.xml"
            target="_blank"
            title="RSS"
        >
            <Fa icon={faRss} />
        </a>
    </div>

    <!-- mobile nav -->
    <div class="navbar-end lg:hidden">
        <div class="dropdown dropdown-end">
            <div
                tabindex="0"
                role="button"
                class="btn btn-ghost rounded-btn"
            >
                <Fa icon={faEllipsis} />
            </div>
            <ul
                tabindex="-1"
                class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
                <li>
                    <a href="/">
                        <Fa icon={faHome} />
                        Home
                    </a>
                </li>
                <li>
                    <a href="/blog">
                        <Fa icon={faLayerGroup} />
                        Blog
                    </a>
                </li>
                <li>
                    <a
                        href={config.githubUrl}
                        target="_blank"
                    >
                        <Fa icon={faGithub} />
                        Github
                    </a>
                </li>
                <li>
                    <a
                        href={config.xUrl}
                        target="_blank"
                    >
                        <Fa icon={faXTwitter} />
                        x.com
                    </a>
                </li>
                <li>
                    <a
                        href={config.supportUrl}
                        target="_blank"
                    >
                        <Fa icon={faHeart} />
                        Support Me
                    </a>
                </li>
                <li>
                    <a
                        href="/rss.xml"
                        target="_blank"
                    >
                        <Fa icon={faRss} />
                        RSS Feed
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
