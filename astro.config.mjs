// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import {
    transformerRenderWhitespace,
    transformerNotationDiff,
    transformerNotationFocus,
    transformerMetaHighlight,
} from "@shikijs/transformers";
import linkValidator from "astro-link-validator";

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },

    markdown: {
        shikiConfig: {
            theme: "catppuccin-mocha",
            transformers: [
                transformerRenderWhitespace({ position: "all" }),
                transformerNotationDiff(),
                transformerNotationFocus(),
                transformerMetaHighlight(),
            ],
        },
    },

    integrations: [
        mdx(),
        icon(),
        linkValidator({
            checkExternal: false,
            failOnBrokenLinks: true,
        }),
    ],
});

