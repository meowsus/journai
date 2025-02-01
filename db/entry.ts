import prisma from "@/prisma/client";
import { type Prisma } from "@prisma/client";

export const countEntries = async () => {
  return await prisma.entry.count();
};

export const getEntriesByCreatedAt = (startsAt: Date, endsAt: Date) => {
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
  });
};

export const getEntry = async (id: number) => {
  return await prisma.entry.findUnique({
    where: { id },
  });
};

export const getEntryWithFullTarotReading = async (id: number) => {
  return await prisma.entry.findUnique({
    where: { id },
    include: {
      TarotReading: {
        include: {
          TarotCardPulls: {
            include: {
              TarotCard: true,
            },
          },
        },
      },
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
