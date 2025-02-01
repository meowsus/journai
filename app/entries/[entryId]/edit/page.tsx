import { getEntry } from "@/db/entry";
import { notFound } from "next/navigation";

interface EditEntryPageProps {
  params: Promise<{ entryId: string }>;
}

export default async function EditEntryPage({ params }: EditEntryPageProps) {
  const { entryId } = await params;

  const entry = await getEntry(Number(entryId));

  if (!entry) {
    notFound();
  }

  return "haha";
  // return <EntryForm entry={entry} />;
}
