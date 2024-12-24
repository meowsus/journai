"use client";

import { saveEntryFormAction } from "@/app/entries/actions";
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
    <form action={formAction}>
      {entry && (
        <input {...form.register("entryId")} type="hidden" value={entry.id} />
      )}

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Title</span>
          <span className="label-text-alt text-warning">Required</span>
        </div>
        <input
          {...form.register("title", { required: true })}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        {form.formState.errors.title && (
          <span className="text-error">
            {form.formState.errors.title.message}
          </span>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Content</span>
          <span className="label-text-alt text-warning">Required</span>
        </div>
        <textarea
          {...form.register("content", { required: true })}
          placeholder="Type here"
          className="textarea input-bordered w-full max-w-xs"
        />
        {form.formState.errors.content && (
          <span className="text-error">
            {form.formState.errors.content.message}
          </span>
        )}
      </label>

      {entry ? (
        <button
          type="submit"
          className="btn"
          disabled={isPending || !form.formState.isValid}
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      ) : (
        <button
          type="submit"
          className="btn"
          disabled={isPending || !form.formState.isValid}
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      )}

      {state.errorMessage && (
        <div className="text-error">{state.errorMessage}</div>
      )}
    </form>
  );
}
