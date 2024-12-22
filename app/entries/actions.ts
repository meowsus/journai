"use server";

import { createEntry } from "@/db/entry";
import { EntryFormSchema, EntryFormSchemaType } from "@/schemas/entryForm";
import { ActionResponse } from "@/types/actions";
import { Entry } from "@prisma/client";

export async function createEntryAction(
  data: EntryFormSchemaType,
): Promise<ActionResponse<Entry>> {
  const result = EntryFormSchema.safeParse(data);

  if (!result.success) {
    return {
      error: true,
      message: result.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  try {
    const entry = await createEntry(data);
    return { data: entry };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: true, message: error.message };
    } else {
      return { error: true, message: "An unknown error occurred" };
    }
  }
}
