"use server";

import { EntryFormSchema } from "@/components/entries/EntryForm/schema";
import { createEntry, deleteEntry, updateEntry } from "@/db/entry";
import { revalidatePath } from "next/cache";

interface FormState {
  success?: boolean;
  error?: string;
}

export async function saveEntryFormAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = EntryFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { error: "Validation failed" };
  }

  try {
    const { entryId, ...restData } = parsed.data;

    if (entryId) {
      await updateEntry(Number(entryId), restData);
    } else {
      await createEntry(restData);
    }
    revalidatePath("/entries");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add entry" };
  }
}

export async function deleteEntryAction(entryId: number) {
  try {
    await deleteEntry(entryId);
    revalidatePath("/entries");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete entry" };
  }
}
