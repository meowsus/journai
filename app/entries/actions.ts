"use server";

import { deleteEntry, updateEntry } from "@/db/entry";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const updateEntryFormDataSchema = z.object({
  entryId: z.string(),
  content: z.string().trim().min(1, {
    message: "Content is required",
  }),
});

export async function updateEntryAction(data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = updateEntryFormDataSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  try {
    const { entryId, ...restData } = parsed.data;

    console.log("Updating entry", entryId, restData);

    await updateEntry(Number(entryId), restData);

    redirect(`/`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update entry");
  }
}

export async function deleteEntryAction(entryId: number) {
  try {
    await deleteEntry(entryId);
    revalidatePath("/entries");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete entry" };
  }
}

export async function publishEntryAction(entryId: number) {
  try {
    await updateEntry(entryId, { isDraft: false });
    revalidatePath("/entries");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to publish entry" };
  }
}

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
