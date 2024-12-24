"use client";

import { deleteEntryFormAction } from "@/app/entries/actions";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

interface DeleteEntryButtonProps {
  entryId: number;
}

export default function DeleteEntryButton({ entryId }: DeleteEntryButtonProps) {
  const [state, formAction, isPending] = useActionState(deleteEntryFormAction, {
    errorMessage: "",
  });

  useEffect(() => {
    if (state.errorMessage) {
      toast.error(state.errorMessage);
    }
  }, [state.errorMessage]);

  return (
    <form action={formAction} className="inline-block">
      <input type="hidden" name="entryId" value={entryId} />
      <button
        type="submit"
        className="btn btn-sm btn-error"
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}
