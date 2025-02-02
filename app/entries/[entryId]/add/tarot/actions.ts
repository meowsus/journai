"use server";

import { deleteTarotCardPull, updateTarotCardPull } from "@/db/tarotCardPull";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createTarotPullFormDataSchema = z.object({
  tarotCardId: z.string().nonempty(),
  isReversed: z.string().optional(),
  entryId: z.string(),
});

export const createTarotCardPullAction = async (data: FormData) => {
  const formDataEntries = Object.fromEntries(data);
  const parsed = createTarotPullFormDataSchema.safeParse(formDataEntries);

  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  const { tarotCardId, isReversed, entryId } = parsed.data;

  // Ensure the TarotReading exists
  const tarotReading = await prisma.tarotReading.upsert({
    where: {
      entryId: Number(entryId),
    },
    update: {},
    create: {
      Entry: {
        connect: {
          id: Number(entryId),
        },
      },
    },
  });

  // Add the TarotCardPull to the existing TarotReading
  await prisma.tarotCardPull.create({
    data: {
      TarotReading: {
        connect: {
          id: tarotReading.id,
        },
      },
      TarotCard: {
        connect: {
          id: Number(tarotCardId),
        },
      },
      isReversed: isReversed === "on",
    },
  });

  revalidatePath(`/entries/${entryId}/add/tarot`);
};

const addImpressionToTarotCardPullFormDataSchema = z.object({
  tarotCardPullId: z.string(),
  entryId: z.string(),
  impression: z.string().nonempty(),
});

export const addImpressionToTarotCardPullAction = async (data: FormData) => {
  const formDataEntries = Object.fromEntries(data);

  const parsed =
    addImpressionToTarotCardPullFormDataSchema.safeParse(formDataEntries);

  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  const { tarotCardPullId, impression, entryId } = parsed.data;

  await updateTarotCardPull(Number(tarotCardPullId), {
    impression,
  });

  revalidatePath(`/entries/${entryId}/add/tarot`);
};

const removeImpressionFromTarotCardPullFormDataSchema = z.object({
  tarotCardPullId: z.string(),
  entryId: z.string(),
});

export const removeImpressionFromTarotCardPullAction = async (
  data: FormData,
) => {
  const formDataEntries = Object.fromEntries(data);

  const parsed =
    removeImpressionFromTarotCardPullFormDataSchema.safeParse(formDataEntries);

  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  const { tarotCardPullId, entryId } = parsed.data;

  await updateTarotCardPull(Number(tarotCardPullId), {
    impression: null,
  });

  revalidatePath(`/entries/${entryId}/add/tarot`);
};

const removeTarotCardPullFormDataSchema = z.object({
  tarotCardPullId: z.string(),
  entryId: z.string(),
});

export const removeTarotCardPullAction = async (data: FormData) => {
  const formDataEntries = Object.fromEntries(data);

  const parsed = removeTarotCardPullFormDataSchema.safeParse(formDataEntries);

  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  const { tarotCardPullId, entryId } = parsed.data;

  await deleteTarotCardPull(Number(tarotCardPullId));

  revalidatePath(`/entries/${entryId}/add/tarot`);
};
