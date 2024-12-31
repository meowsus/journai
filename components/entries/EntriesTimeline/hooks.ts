import { type SummaryApiResponse } from "@/app/api/entries/[entryId]/summary/route";
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
        toast.error("API request failed");
      }

      try {
        const { data, error } = (await response.json()) as SummaryApiResponse;

        if (error) {
          toast.error(`The API returned an error: ${error}`);
          return;
        }

        if (!data) {
          console.error(data);
          toast.error("No data returned from API");
          return;
        }

        toast.success("Entry summary generated");

        setEntrySummary(data);
      } catch (error) {
        console.error(error);
        toast.error("Unable to parse API response");
      }
    });
  }, [entryId, startTransition]);

  return { generate, isPending, entrySummary };
};

export default useGenerateEntrySummary;
