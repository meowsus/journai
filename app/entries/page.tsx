import DeleteEntryButton from "@/components/entries/DeleteEntryForm";
import { getAllEntries } from "@/db/entry";
import { formatDate } from "date-fns";
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
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <h1 className="text-4xl mb-2">Entries</h1>

        <div className="flex items-center gap-2">
          <Link href="/entries/new" className="btn btn-sm btn-primary">
            New Entry
          </Link>
        </div>
      </div>

      <ul className="timeline timeline-vertical timeline-compact">
        {entries.map((entry, index) => (
          <li key={entry.id}>
            {index > 0 && <hr />}
            <div className="timeline-start">
              <span className="text-sm text-slate-500">
                {formatDate(entry.createdAt, "MMM d, yyyy @ h:mm a")}
              </span>
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end">
              <Link
                className="link hover:link-accent"
                href={`/entries/${entry.id}`}
              >
                <strong>{entry.title}</strong>
              </Link>{" "}
              {entry.content}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );

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
