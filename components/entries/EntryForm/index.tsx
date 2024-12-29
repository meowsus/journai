"use client";

import { saveEntryFormAction } from "@/app/entries/actions";
import DeleteEntryButton from "@/components/entries/DeleteEntryButton";
import { EntryFormSchema } from "@/components/entries/EntryForm/schema";
import { type EntryWithSummary } from "@/db/entry";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { type z } from "zod";

interface EntryFormProps {
  entry?: EntryWithSummary;
}

export default function EntryForm({ entry }: EntryFormProps) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    saveEntryFormAction,
    {},
  );

  const form = useForm<z.output<typeof EntryFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(EntryFormSchema),
    defaultValues: {
      entryId: entry?.id.toString() ?? "",
      content: entry?.content ?? "",
    },
  });

  const title = useMemo(() => {
    if (entry?.summary?.title) return `Update ${entry.summary.title}`;
    if (entry) return "Update Entry";
    return "New Entry";
  }, [entry]);

  useEffect(() => {
    if (state.success) {
      toast.success("Entry saved");
      router.push("/entries");
    } else if (state.success) {
      toast.error(state.error);
    }
  }, [router, state.error, state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <h1 className="text-4xl">{title}</h1>

      {entry && (
        <input {...form.register("entryId")} type="hidden" value={entry.id} />
      )}

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Content</span>
          <span className="label-text-alt text-warning">Required</span>
        </div>
        <textarea
          {...form.register("content", { required: true })}
          placeholder="Type here"
          className="textarea input-bordered w-full"
        />
        {form.formState.errors.content && (
          <span className="text-error">
            {form.formState.errors.content.message}
          </span>
        )}
      </label>

      {state.error && <div className="text-error">{state.error}</div>}

      <div className="flex gap-2 justify-end">
        {entry ? (
          <>
            <DeleteEntryButton entryId={entry.id} />

            <button
              type="submit"
              className="btn btn-sm btn-primary"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending ? "Updating..." : "Update"}
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="btn btn-sm btn-primary"
            disabled={isPending || !form.formState.isValid}
          >
            {isPending ? "Adding..." : "Add"}
          </button>
        )}
      </div>
    </form>
  );
}
