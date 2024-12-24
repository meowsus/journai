import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

export const getAllEntries = async () => {
  return await prisma.entry.findMany();
};

export const getEntry = async (id: number) => {
  return await prisma.entry.findUnique({
    where: { id },
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
