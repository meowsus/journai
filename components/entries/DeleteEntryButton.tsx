"use client";

import { deleteEntryAction } from "@/app/entries/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

interface DeleteEntryButtonProps {
  entryId: number;
}

export default function DeleteEntryButton({ entryId }: DeleteEntryButtonProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
    startTransition(async () => {
      try {
        const result = await deleteEntryAction(entryId);
        if (result.success) {
          toast.success("Entry deleted");
          router.push("/entries");
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete entry");
      }
    });
  };

  return (
    <button
      type="button"
      className="btn btn-error btn-sm"
      disabled={isPending}
      onClick={onClick}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
