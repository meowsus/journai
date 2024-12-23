"use server";

import {
  CreateEntryFormSchema,
  DeleteEntryFormSchema,
} from "@/components/EntryForm/schema";
import { createEntry, deleteEntry } from "@/db/entry";
import { redirect } from "next/navigation";

interface FormState {
  errorMessage?: string;
}

export async function createEntryFormAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = CreateEntryFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      errorMessage: "Validation failed",
    };
  }

  try {
    await createEntry(parsed.data);
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
