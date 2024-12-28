import { z } from "zod";

export const AiSummarySchema = z.object({
  summary: z.object({
    title: z.string(),
    content: z.string(),
  }),
});
