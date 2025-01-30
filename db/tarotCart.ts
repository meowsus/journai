import prisma from "@/prisma/client";

export const countTarotCards = async () => {
  return await prisma.tarotCard.count();
};
