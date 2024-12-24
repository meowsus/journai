import { getEntry } from "@/db/entry";
import { notFound } from "next/navigation";

interface EntryPageParams {
  entryId: string;
}

interface EntryPageProps {
  params: EntryPageParams;
}

export default async function EntryPage({ params }: EntryPageProps) {
  const entry = await getEntry(Number(params.entryId));

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
