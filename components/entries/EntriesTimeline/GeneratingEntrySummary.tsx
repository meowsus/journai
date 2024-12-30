"use client";

import EntrySummaryContent from "@/components/entries/EntriesTimeline/EntrySummaryContent";
import { type EntrySummary } from "@prisma/client";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";

const useGenerateEntrySummary = (entryId: number) => {
  const [isPending, startTransition] = useTransition();
  const [entrySummary, setEntrySummary] = useState<EntrySummary | null>(null);

  const generate = useCallback(() => {
    startTransition(async () => {
      const response = await fetch(`/api/entries/${entryId}/summary`, {
        method: "POST",
      });

      if (!response.ok) {
        toast.error("Failed to generate summary");
      }

      try {
        const { data } = await response.json();
        setEntrySummary(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to generate summary");
      }
    });
  }, [entryId, startTransition]);

  return { generate, isPending, entrySummary };
};

interface GeneratingEntrySummaryProps {
  entryId: number;
}

export default function GeneratingEntrySummary({
  entryId,
}: GeneratingEntrySummaryProps) {
  const { generate, isPending, entrySummary } =
    useGenerateEntrySummary(entryId);

  useEffect(() => {
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
      <span className="text-gray-500">
        Failed to generate summary
        <button className="link" type="button" onClick={generate}>
          Try again?
        </button>
      </span>
    );
  }

  return <EntrySummaryContent entryId={entryId} entrySummary={entrySummary} />;
}
