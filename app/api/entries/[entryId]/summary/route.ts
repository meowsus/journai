import { AiSummarySchema } from "@/app/api/entries/[entryId]/summary/schema";
import { getEntry } from "@/db/entry";
import {
  createEntrySummary,
  getEntrySummaryByEntryId,
} from "@/db/entrySummary";
import { type EntrySummary, type Prisma } from "@prisma/client";
import { generateObject } from "ai";
import { NextResponse, type NextRequest } from "next/server";
import { createOllama } from "ollama-ai-provider";

const ollama = createOllama();

export interface SummaryApiResponse {
  data?: EntrySummary;
  error?: string;
}

type Params = Promise<{ entryId: string }>;

export async function POST(
  request: NextRequest,
  { params }: { params: Params },
): Promise<NextResponse<SummaryApiResponse>> {
  const { entryId } = await params;

  const entry = await getEntry(Number(entryId));

  if (!entry) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  const entrySummary = await getEntrySummaryByEntryId(entry.id);

  if (entrySummary) {
    return NextResponse.json({ data: entrySummary });
  }

  try {
    const { object } = await generateObject({
      model: ollama("mistral"),
      schema: AiSummarySchema,
      prompt: `Summarize this journal entry: ${entry.content}`,
    });

    if (!object?.summary) {
      return NextResponse.json(
        { error: "No summary object generated" },
        { status: 400 },
      );
    }

    const data: Prisma.EntrySummaryCreateInput = {
      ...object.summary,
      entry: { connect: { id: entry.id } },
    };

    const result = await createEntrySummary(data);

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create entry summary" },
      { status: 500 },
    );
  }
}
