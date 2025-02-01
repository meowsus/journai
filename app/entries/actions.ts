"use server";

import { deleteEntry, updateEntry } from "@/db/entry";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  entryId: z.string(),
  content: z.string().trim().min(1, {
    message: "Content is required",
  }),
});

export async function updateEntryAction(data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);

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
