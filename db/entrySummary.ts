import prisma from "@/prisma/client";
import { type Prisma } from "@prisma/client";

export const createEntrySummary = async (
  data: Prisma.EntrySummaryCreateInput,
) => {
  return await prisma.entrySummary.create({
    data,
  });
};
