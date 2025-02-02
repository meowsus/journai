import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";

const ollama = createOllama();

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: ollama("mistral"),
    system: "You are a helpful assistant.",
    prompt,
  });

  return result.toDataStreamResponse();
}
