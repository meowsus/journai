"use client";

import EntrySummaryContent from "@/components/entries/EntriesTimeline/EntrySummaryContent";
import { type EntrySummary } from "@prisma/client";
import { useEffect, useState } from "react";

interface GeneratingEntrySummaryProps {
  entryId: number;
}

export default function GeneratingEntrySummary({
  entryId,
}: GeneratingEntrySummaryProps) {
  const [entrySummary, setEntrySummary] = useState<EntrySummary | null>(null);

  useEffect(() => {
    const generateEntrySummary = async () => {
      const response = await fetch(`/api/entries/${entryId}/summary`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      setEntrySummary(data);
    };

    generateEntrySummary();
  }, [entryId]);

  if (!entrySummary) {
    return <p>Loading...</p>;
  }

  return <EntrySummaryContent entryId={entryId} entrySummary={entrySummary} />;
}
