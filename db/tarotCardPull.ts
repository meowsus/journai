import prisma from "@/prisma/client";
import { type Prisma } from "@prisma/client";

export const createTarotCardPull = async (
  data: Prisma.TarotCardPullCreateInput,
) => {
  return await prisma.tarotCardPull.create({
    data,
  });
};
