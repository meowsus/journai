import { type EntryWithSummary } from "@/db/entry";
import { formatDate } from "date-fns";
import Link from "next/link";

interface EntriesTimelineProps {
  entries: EntryWithSummary[];
}

export default function EntriesTimeline({ entries }: EntriesTimelineProps) {
  return (
    <ul className="timeline timeline-vertical timeline-compact">
      {entries.map((entry, index) => (
        <li key={entry.id}>
          {index > 0 && <hr />}
          <div className="timeline-start">
            <div className="inline-flex items-center gap-2">
              <span className="text-sm text-slate-500">
                {formatDate(entry.createdAt, "MMM d, yyyy @ h:mm a")}
              </span>
              {entry.isDraft && (
                <div className="badge badge-secondary badge-sm">Draft</div>
              )}
            </div>
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
            {entry.isDraft ? (
              <Link
                className="link link-primary"
                href={`/entries/${entry.id}/edit`}
              >
                Edit
              </Link>
            ) : (
              <Link className="link link-primary" href={`/entries/${entry.id}`}>
                View
              </Link>
            )}

            {/* {entry.summary ? (
              <EntrySummaryContent
                entryId={entry.id}
                entrySummary={entry.summary}
              />
            ) : (
              <GeneratingEntrySummary entryId={entry.id} />
            )} */}
          </div>
          <hr />
        </li>
      ))}
    </ul>
  );
}
