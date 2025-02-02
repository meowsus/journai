import EntriesTimeline from "@/components/entries/EntriesTimeline";
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
  const isCurrentMonth = startsAt.getTime() === startOfMonth(now).getTime();

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
        {isCurrentMonth ? (
          <div className="flex items-center gap-2">
            <Link
              href={{
                pathname: "/entries",
                query: {
                  startsAt: sub(startsAt, { months: 1 }).toISOString(),
                  endsAt: sub(endsAt, { months: 1 }).toISOString(),
                },
              }}
              className="btn btn-neutral"
            >
              View previous month
            </Link>
            or
            <Link href="/entries/new" className="btn btn-primary">
              Create a new entry
            </Link>
          </div>
        ) : (
          <Link href="/entries" className="btn btn-primary">
            Back to the present
          </Link>
        )}
      </Hero>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <h1 className="mb-2 text-4xl">
          Entries for {formatDate(startsAt, "MMMM yyyy")}
        </h1>
      </div>

      <Link
        href={{
          pathname: "/entries",
          query: {
            startsAt: sub(startsAt, { months: 1 }).toISOString(),
            endsAt: sub(endsAt, { months: 1 }).toISOString(),
          },
        }}
        className="btn btn-ghost btn-sm"
      >
        Previous month
      </Link>

      <EntriesTimeline entries={entries} />

      <Link
        href={{
          pathname: "/entries",
          query: {
            startsAt: add(startsAt, { months: 1 }).toISOString(),
            endsAt: add(endsAt, { months: 1 }).toISOString(),
          },
        }}
        className="btn btn-ghost btn-sm"
      >
        Next month
      </Link>
    </div>
  );
}
