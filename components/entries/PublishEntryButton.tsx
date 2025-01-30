"use client";

import { publishEntryAction } from "@/app/entries/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

interface PublishEntryButtonProps {
  entryId: number;
}

export default function PublishEntryButton({
  entryId,
}: PublishEntryButtonProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
    startTransition(async () => {
      try {
        const result = await publishEntryAction(entryId);
        if (result.success) {
          toast.success("Entry published");
          router.push("/entries");
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to publish entry");
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-sm btn-secondary"
      disabled={isPending}
      onClick={onClick}
    >
      {isPending ? "Publishing..." : "Publish"}
    </button>
  );
}
