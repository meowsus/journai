import { z } from "zod";

export const EntryFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(1, {
    message: "Content is required",
  }),
});

export type EntryFormSchemaType = z.infer<typeof EntryFormSchema>;
