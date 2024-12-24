import DeleteEntryButton from "@/app/entries/DeleteEntryForm";
import { getAllEntries } from "@/db/entry";
import Link from "next/link";

export default async function EntriesPage() {
  const entries = await getAllEntries();

  if (entries.length === 0) {
    return (
      <div>
        <div>No entries found</div>
      </div>
    );
  }

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>
          <Link className="link" href={`/entries/${entry.id}`}>
            {entry.title}: {entry.content}
          </Link>
          <DeleteEntryButton entryId={entry.id} />
        </div>
      ))}
    </div>
  );
}
