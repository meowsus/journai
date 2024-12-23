"use client";

import { createEntryAction } from "@/app/entries/actions";
import {
  EntryFormOutput,
  EntryFormSchema,
} from "@/components/EntryForm/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EntryForm() {
  const [state, formAction, isPending] = useActionState(createEntryAction, {
    message: "",
  });

  const form = useForm<EntryFormOutput>({
    mode: "onChange",
    resolver: zodResolver(EntryFormSchema),
    defaultValues: {
      title: "",
      content: "",
      ...(state?.fields ?? {}),
    },
  });

  useEffect(() => {
    if (state.message) {
      toast(state.message);
    }
  }, [state.message]);

  return (
    <form
      action={formAction}
      onSubmit={form.handleSubmit((data, event) =>
        event?.currentTarget.form.requestSubmit(),
      )}
    >
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

      <button type="submit" className="btn" disabled={isPending}>
        {isPending ? "Adding..." : "Add"}
      </button>

      {state.error && state.message && (
        <div className="text-error">
          {state.message}

          {state.issues && (
            <ul>
              {state.issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
