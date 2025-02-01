import { z } from "zod";

export const DeleteEntryFormSchema = z.object({
  entryId: z.string(),
});
