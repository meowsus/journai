import EntryForm from "@/components/entries/EntryForm";
import { createDraftEntry } from "@/db/entry";
import { countTarotCards } from "@/db/tarotCart";

export default async function NewEntryPage() {
  const draftEntry = await createDraftEntry();
  const tarotCardCount = await countTarotCards();

  return (
    <>
      Cards: {tarotCardCount}
      <EntryForm entry={draftEntry} />
    </>
  );
}
