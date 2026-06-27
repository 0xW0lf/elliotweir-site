import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const collections = {
  research: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.string(),
      tags: z.array(z.string()).optional(),
    }),
  }),
};