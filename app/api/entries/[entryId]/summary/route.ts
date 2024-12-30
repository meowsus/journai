import { AiSummarySchema } from "@/app/api/entries/[entryId]/summary/schema";
import { getEntry } from "@/db/entry";
import { createEntrySummary } from "@/db/entrySummary";
import { type Prisma } from "@prisma/client";
import { generateObject } from "ai";
import { NextResponse, type NextRequest } from "next/server";
import { createOllama } from "ollama-ai-provider";

const ollama = createOllama();

type Params = Promise<{ entryId: string }>;

export async function POST(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { entryId } = await params;

  const entry = await getEntry(Number(entryId));

  if (!entry) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  try {
    const { object } = await generateObject({
      model: ollama("mistral"),
      schema: AiSummarySchema,
      prompt: `Summarize this journal entry: ${entry.content}`,
    });

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
