import prisma from "@/prisma/client";

export const getAllTarotCards = async () => {
  return await prisma.tarotCard.findMany();
};

export const getTarotCard = async (id: number) => {
  return await prisma.tarotCard.findUnique({
    where: { id },
  });
};

export const getTarotCardsWithoutIds = async (ids: number[]) => {
  return await prisma.tarotCard.findMany({
    where: {
      id: {
        notIn: ids,
      },
    },
  });
};
