"use server";

import { EntryFormSchema } from "@/components/EntryForm/schema";
import { createEntry } from "@/db/entry";
import { redirect } from "next/navigation";

interface FormState {
  message: string;
  error?: boolean;
  fields?: Record<string, string>;
  issues?: string[];
}

export async function createEntryAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = EntryFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Validation failed",
    };
  }

  try {
    await createEntry(parsed.data);
  } catch (error) {
    console.error(error);

    return {
      message: "Failed to add entry",
    };
  }

  redirect("/entries");
}
