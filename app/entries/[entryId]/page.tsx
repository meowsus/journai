import DeleteEntryButton from "@/components/entries/DeleteEntryForm";
import { getEntry, getNextEntry, getPreviousEntry } from "@/db/entry";
import { formatRelative } from "date-fns";
import Link from "next/link";
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

  const nextEntry = await getNextEntry(entry.id);
  const previousEntry = await getPreviousEntry(entry.id);

  const hasUpdates = entry.updatedAt.getTime() !== entry.createdAt.getTime();

  return (
    <article className="flex flex-col gap-4">
      <header>
        <div className="flex justify-between gap-2">
          <h1 className="text-4xl mb-2">{entry.title}</h1>
          <div className="flex items-center gap-2">
            <Link
              href={`/entries/${entry.id}/edit`}
              className="btn btn-sm btn-primary"
            >
              Edit
            </Link>

            <DeleteEntryButton entryId={entry.id} />
          </div>
        </div>
        <blockquote className="flex flex-col gap-2 italic border-l-2 border-slate-600 pl-2 py-1">
          {hasUpdates && (
            <>Last updated {formatRelative(entry.updatedAt, new Date())}</>
          )}
          Created {formatRelative(entry.createdAt, new Date())}
        </blockquote>
      </header>

      <p>{entry.content}</p>

      <div className="flex justify-between">
        {previousEntry ? (
          <Link
            href={`/entries/${previousEntry.id}`}
            className="btn btn-sm btn-neutral"
          >
            « {previousEntry.title}
          </Link>
        ) : (
          <span />
        )}

        {nextEntry ? (
          <Link
            href={`/entries/${nextEntry.id}`}
            className="btn btn-sm btn-neutral"
          >
            {nextEntry.title} »
          </Link>
        ) : (
          <span />
        )}
      </div>
    </article>
  );
}
