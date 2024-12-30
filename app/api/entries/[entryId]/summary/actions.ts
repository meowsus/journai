"use server";

import { type ActionResponseWithData } from "@/types/actions";
import { type EntrySummary } from "@prisma/client";

export const generateEntrySummary = async (
  entryId: number,
): Promise<ActionResponseWithData<EntrySummary>> => {
  const response = await fetch(`/api/entries/${entryId}/summary`, {
    method: "POST",
  });

  if (!response.ok) {
    return { error: "Failed to generate summary" };
  }

  try {
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { error: "Failed to parse summary JSON response" };
  }
};
