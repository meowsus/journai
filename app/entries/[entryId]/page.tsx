import DeleteEntryButton from "@/components/entries/DeleteEntryForm";
import { getEntry } from "@/db/entry";
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

  const hasUpdates = entry.updatedAt.getTime() !== entry.createdAt.getTime();

  return (
    <article>
      <header className="mb-2">
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
    </article>
  );
}
