import { z } from "zod";

export const CreateEntryFormSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Title is required",
  }),
  content: z.string().trim().min(1, {
    message: "Content is required",
  }),
});

export type CreateEntryFormOutput = z.output<typeof CreateEntryFormSchema>;

export const DeleteEntryFormSchema = z.object({
  entryId: z.string(),
});

export type DeleteEntryFormOutput = z.output<typeof DeleteEntryFormSchema>;
