import { getEntry } from "@/db/entry";
import { notFound } from "next/navigation";

interface EntryPageProps {
  params: Promise<{ entryId: string }>;
}

export default async function EntryPage({ params }: EntryPageProps) {
  const { entryId } = await params;

  const entry = await getEntry(Number(entryId));

  if (!entry) {
    notFound();
  }

  return (
    <div>
      <h2>{entry.title}</h2>
      <p>{entry.content}</p>
    </div>
  );
}
