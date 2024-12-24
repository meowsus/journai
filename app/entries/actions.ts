"use server";

import {
  DeleteEntryFormSchema,
  EntryFormSchema,
} from "@/components/entries/EntryForm/schema";
import { createEntry, deleteEntry, updateEntry } from "@/db/entry";
import { redirect } from "next/navigation";

interface FormState {
  errorMessage?: string;
}

export async function saveEntryFormAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = EntryFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      errorMessage: "Validation failed",
    };
  }

  try {
    const { entryId, ...restData } = parsed.data;

    if (entryId) {
      await updateEntry(Number(entryId), restData);
    } else {
      await createEntry(restData);
    }
  } catch (error) {
    console.error(error);

    return {
      errorMessage: "Failed to add entry",
    };
  }

  redirect("/entries");
}

export async function deleteEntryFormAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = DeleteEntryFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      errorMessage: "Validation failed",
    };
  }

  try {
    await deleteEntry(Number(parsed.data.entryId));
  } catch (error) {
    console.error(error);

    return {
      errorMessage: "Failed to delete entry",
    };
  }

  redirect("/entries");
}
