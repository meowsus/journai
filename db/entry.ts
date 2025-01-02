import {
  deleteEntrySummary,
  getEntrySummaryByEntryId,
} from "@/db/entrySummary";
import prisma from "@/prisma/client";
import { type Prisma } from "@prisma/client";

export const countEntries = async () => {
  return await prisma.entry.count();
};

export type EntryWithSummary = Prisma.EntryGetPayload<{
  include: { summary: true };
}>;

export const getEntriesByCreatedAt = (
  startsAt: Date,
  endsAt: Date,
): Promise<EntryWithSummary[]> => {
  return prisma.entry.findMany({
    where: {
      createdAt: {
        gte: startsAt,
        lt: endsAt,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      summary: true,
    },
  });
};

export const getEntry = async (id: number) => {
  return await prisma.entry.findUnique({
    where: { id },
    include: {
      summary: true,
    },
  });
};

export const getNextEntry = async (id: number) => {
  const currentEntry = await getEntry(id);

  if (!currentEntry) {
    return null;
  }

  return await prisma.entry.findFirst({
    where: {
      createdAt: { gt: currentEntry.createdAt },
    },
    include: {
      summary: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const getPreviousEntry = async (id: number) => {
  const currentEntry = await getEntry(id);

  if (!currentEntry) {
    return null;
  }

  return await prisma.entry.findFirst({
    where: {
      createdAt: { lt: currentEntry.createdAt },
    },
    include: {
      summary: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createEntry = async (data: Prisma.EntryCreateInput) => {
  return await prisma.entry.create({
    data,
  });
};

export const updateEntry = async (
  id: number,
  data: Prisma.EntryUpdateInput,
) => {
  const entrySummary = await getEntrySummaryByEntryId(id);

  if (entrySummary) {
    await deleteEntrySummary(entrySummary.id);
  }

  return await prisma.entry.update({
    where: { id },
    data,
  });
};

export const deleteEntry = async (id: number) => {
  return await prisma.entry.delete({
    where: { id },
  });
};
