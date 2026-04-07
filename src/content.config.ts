import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
    loader: glob({
        base: "./src/pages/blog/_posts",
        pattern: "**/*.{md,mdx}",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z
            .string()
            .or(z.date())
            .transform((val) => new Date(val)),
        image: z
            .object({
                src: z.string(),
                caption: z.string().optional(),
            })
            .optional(),
        links: z
            .array(
                z.object({
                    name: z.string(),
                    url: z.url(),
                }),
            )
            .optional(),
        tags: z.array(z.string()).optional(),
        prev: z.string().optional(),
        next: z.string().optional(),
    }),
});

export const collections = { blog };
