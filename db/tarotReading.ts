import prisma from "@/prisma/client";
import { type Prisma } from "@prisma/client";

export const createTarotReading = async (
  data: Prisma.TarotReadingCreateInput,
) => {
  return await prisma.tarotReading.create({
    data,
  });
};

export const updateTarotReading = async (
  id: number,
  data: Prisma.TarotReadingUpdateInput,
) => {
  return await prisma.tarotReading.update({
    where: { id },
    data,
  });
};
