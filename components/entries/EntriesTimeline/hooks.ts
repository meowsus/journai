import { type EntrySummary } from "@prisma/client";
import { useCallback, useState, useTransition } from "react";
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

export default useGenerateEntrySummary;
