// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import {
    transformerRenderWhitespace,
    transformerRenderIndentGuides,
    transformerNotationDiff,
    transformerNotationFocus,
    transformerMetaHighlight,
} from "@shikijs/transformers";

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },

    markdown: {
        shikiConfig: {
            theme: "catppuccin-mocha",
            transformers: [
                transformerRenderWhitespace({ position: "all" }),
                // transformerRenderIndentGuides(),
                transformerNotationDiff(),
                transformerNotationFocus(),
                transformerMetaHighlight(),
            ],
        },
    },

    integrations: [mdx(), icon()],
});

