import Hero from "@/components/Hero";
import { countEntries, getEntriesByCreatedAt } from "@/db/entry";
import { add, endOfMonth, formatDate, startOfMonth, sub } from "date-fns";
import Link from "next/link";

interface EntriesPageProps {
  searchParams?: Promise<{
    startsAt: string;
    endsAt: string;
  }>;
}

export default async function EntriesPage({ searchParams }: EntriesPageProps) {
  const entryCount = await countEntries();

  if (entryCount === 0) {
    return (
      <Hero
        title="No entries found"
        subtitle="We'll need to create some entries before we can show them here."
      >
        <Link href="/entries/new" className="btn btn-primary">
          Create your first entry
        </Link>
      </Hero>
    );
  }

  const now = new Date();

  const { startsAt: startsAtParam, endsAt: endsAtParam } =
    (await searchParams) || {};

  const startsAt = startsAtParam ? new Date(startsAtParam) : startOfMonth(now);
  const endsAt = endsAtParam ? new Date(endsAtParam) : endOfMonth(startsAt);

  const entries = await getEntriesByCreatedAt(startsAt, endsAt);

  if (entries.length === 0) {
    return (
      <Hero
        title="No entries found"
        subtitle={`We couldn't find any entries for ${formatDate(
          startsAt,
          "MMMM yyyy",
        )}`}
      >
        <Link href="/entries" className="btn btn-primary">
          Back to the present
        </Link>
      </Hero>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <h1 className="text-4xl mb-2">
          Entries for {formatDate(startsAt, "MMMM yyyy")}
        </h1>

        <div className="flex items-center gap-2">
          <Link href="/entries/new" className="btn btn-sm btn-primary">
            New Entry
          </Link>
        </div>
      </div>

      <Link
        href={{
          pathname: "/entries",
          query: {
            startsAt: sub(startsAt, { months: 1 }).toISOString(),
            endsAt: sub(endsAt, { months: 1 }).toISOString(),
          },
        }}
        className="btn btn-sm btn-ghost"
      >
        Previous month
      </Link>

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

      <Link
        href={{
          pathname: "/entries",
          query: {
            startsAt: add(startsAt, { months: 1 }).toISOString(),
            endsAt: add(endsAt, { months: 1 }).toISOString(),
          },
        }}
        className="btn btn-sm btn-ghost"
      >
        Next month
      </Link>
    </div>
  );
}
