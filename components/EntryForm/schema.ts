import { z } from "zod";

export const EntryFormSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Title is required",
  }),
  content: z.string().trim().min(1, {
    message: "Content is required",
  }),
});

export type EntryFormOutput = z.output<typeof EntryFormSchema>;
