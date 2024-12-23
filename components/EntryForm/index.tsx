"use client";

import { createEntryFormAction } from "@/app/entries/actions";
import {
  CreateEntryFormOutput,
  CreateEntryFormSchema,
} from "@/components/EntryForm/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EntryForm() {
  const [state, formAction, isPending] = useActionState(createEntryFormAction, {
    errorMessage: "",
  });

  const form = useForm<CreateEntryFormOutput>({
    mode: "onChange",
    resolver: zodResolver(CreateEntryFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (state.errorMessage) {
      toast.error(state.errorMessage);
    }
  }, [state.errorMessage]);

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

      {state.errorMessage && (
        <div className="text-error">{state.errorMessage}</div>
      )}
    </form>
  );
}
