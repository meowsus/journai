"use client";

import { saveEntryFormAction } from "@/app/entries/actions";
import DeleteEntryButton from "@/components/entries/DeleteEntryButton";
import { EntryFormSchema } from "@/components/entries/EntryForm/schema";
import PublishEntryButton from "@/components/entries/PublishEntryButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Entry } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { type z } from "zod";

interface EntryFormProps {
  entry: Entry;
}

export default function EntryForm({ entry }: EntryFormProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [state, formAction, isPending] = useActionState(
    saveEntryFormAction,
    {},
  );

  const form = useForm<z.output<typeof EntryFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(EntryFormSchema),
    defaultValues: {
      entryId: entry.id.toString() ?? "",
      content: entry.content ?? "",
    },
  });

  useEffect(() => {
    if (state.success) {
      toast.success("Entry saved");
      router.push("/entries");
    } else if (state.success) {
      toast.error(state.error);
    }
  }, [router, state.error, state.success]);

  const isNew = pathname === "/entries/new";

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <h1 className="flex items-center justify-between gap-2 text-4xl">
        {isNew ? "New" : "Edit"} Entry
        {entry.isDraft && <div className="badge badge-secondary">Draft</div>}
      </h1>

      <input {...form.register("entryId")} type="hidden" value={entry.id} />

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

      <div className="flex justify-end gap-2">
        <DeleteEntryButton entryId={entry.id} />
        <PublishEntryButton entryId={entry.id} />

        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={isPending || !form.formState.isValid}
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}
