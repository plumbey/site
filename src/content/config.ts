import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const albums = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      cover: image(),
    }),
});

export const collections = {
  albums,
};
