import prisma from "@/prisma/client";
import { type Prisma } from "@prisma/client";

export const createEntrySummary = async (
  data: Prisma.EntrySummaryCreateInput,
) => {
  return await prisma.entrySummary.create({
    data,
  });
};

export const deleteEntrySummary = async (id: number) => {
  return await prisma.entrySummary.delete({
    where: { id },
  });
};

export const getEntrySummary = async (id: number) => {
  return await prisma.entrySummary.findUnique({
    where: { id },
  });
};

export const getEntrySummaryByEntryId = async (entryId: number) => {
  return await prisma.entrySummary.findFirst({
    where: { entryId },
  });
};
