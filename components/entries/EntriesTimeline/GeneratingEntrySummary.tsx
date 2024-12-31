"use client";

import EntrySummaryContent from "@/components/entries/EntriesTimeline/EntrySummaryContent";
import useGenerateEntrySummary from "@/components/entries/EntriesTimeline/hooks";
import { useEffect, useRef } from "react";

interface GeneratingEntrySummaryProps {
  entryId: number;
}

export default function GeneratingEntrySummary({
  entryId,
}: GeneratingEntrySummaryProps) {
  const { generate, isPending, entrySummary } =
    useGenerateEntrySummary(entryId);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    generate();
  }, [generate]);

  if (isPending) {
    return (
      <span className="flex items-center gap-2">
        <span className="loading loading-infinity" />
        <span>Generating entry summary...</span>
      </span>
    );
  }

  if (!entrySummary) {
    return (
      <span className="text-error flex items-center gap-2">
        Failed to generate summary
        <button className="link" type="button" onClick={generate}>
          Try again?
        </button>
      </span>
    );
  }

  return <EntrySummaryContent entryId={entryId} entrySummary={entrySummary} />;
}
