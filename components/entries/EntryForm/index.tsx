"use client";

import { saveEntryFormAction } from "@/app/entries/actions";
import DeleteEntryButton from "@/components/entries/DeleteEntryForm";
import { EntryFormSchema } from "@/components/entries/EntryForm/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Entry } from "@prisma/client";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface EntryFormProps {
  entry?: Entry;
}

export default function EntryForm({ entry }: EntryFormProps) {
  const [state, formAction, isPending] = useActionState(saveEntryFormAction, {
    errorMessage: "",
  });

  const form = useForm<z.output<typeof EntryFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(EntryFormSchema),
    defaultValues: {
      entryId: entry?.id.toString() ?? "",
      title: entry?.title ?? "",
      content: entry?.content ?? "",
    },
  });

  useEffect(() => {
    if (state.errorMessage) {
      toast.error(state.errorMessage);
    }
  }, [state.errorMessage]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <h1 className="text-4xl">{entry ? entry.title : "New Entry"}</h1>

      {entry && (
        <input {...form.register("entryId")} type="hidden" value={entry.id} />
      )}

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Title</span>
          <span className="label-text-alt text-warning">Required</span>
        </div>
        <input
          {...form.register("title", { required: true })}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
        {form.formState.errors.title && (
          <span className="text-error">
            {form.formState.errors.title.message}
          </span>
        )}
      </label>

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

      {state.errorMessage && (
        <div className="text-error">{state.errorMessage}</div>
      )}

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
