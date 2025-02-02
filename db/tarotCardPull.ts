import prisma from "@/prisma/client";
import { type Prisma } from "@prisma/client";

export const createTarotCardPull = async (
  data: Prisma.TarotCardPullCreateInput,
) => {
  return await prisma.tarotCardPull.create({
    data,
  });
};

export const updateTarotCardPull = async (
  id: number,
  data: Prisma.TarotCardPullUpdateInput,
) => {
  return await prisma.tarotCardPull.update({
    where: { id },
    data,
  });
};

export const deleteTarotCardPull = async (id: number) => {
  return await prisma.tarotCardPull.delete({
    where: { id },
  });
};
