import EntryForm from "@/components/entries/EntryForm";
import { createDraftEntry } from "@/db/entry";

export default async function NewEntryPage() {
  const draftEntry = await createDraftEntry();

  return <EntryForm entry={draftEntry} />;
}
