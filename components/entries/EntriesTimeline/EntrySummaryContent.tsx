import { type EntrySummary } from "@prisma/client";
import Link from "next/link";

interface EntrySummaryProps {
  entryId: number;
  entrySummary: EntrySummary;
}

export default function EntrySummaryContent({
  entryId,
  entrySummary,
}: EntrySummaryProps) {
  return (
    <>
      <Link className="link" href={`/entries/${entryId}`}>
        <strong>{entrySummary.title}</strong>
      </Link>{" "}
      {entrySummary.content}
    </>
  );
}
