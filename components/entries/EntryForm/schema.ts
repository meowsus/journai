import { z } from "zod";

export const EntryFormSchema = z.object({
  entryId: z.string().optional(),
  content: z.string().trim().min(1, {
    message: "Content is required",
  }),
});

export const DeleteEntryFormSchema = z.object({
  entryId: z.string(),
});
