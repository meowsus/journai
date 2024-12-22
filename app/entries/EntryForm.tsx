"use client";

import { EntryFormSchema, EntryFormSchemaType } from "@/schemas/entryForm";
import { ActionResponse } from "@/types/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Entry } from "@prisma/client";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface EntryFormProps {
  createEntryAction: (
    data: EntryFormSchemaType,
  ) => Promise<ActionResponse<Entry>>;
}

export default function EntryForm({ createEntryAction }: EntryFormProps) {
  const {
    handleSubmit,
    register,
    formState: { isValid, isSubmitting, errors },
  } = useForm<EntryFormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(EntryFormSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = await createEntryAction(data);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Entry added successfully");
      redirect("/entries");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Title</span>
          <span className="label-text-alt text-warning">Required</span>
        </div>
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        {errors.title && (
          <span className="text-error">{errors.title.message}</span>
        )}
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Content</span>
          <span className="label-text-alt text-warning">Required</span>
        </div>
        <textarea
          {...register("content", { required: true })}
          placeholder="Type here"
          className="textarea input-bordered w-full max-w-xs"
        />
        {errors.content && (
          <span className="text-error">{errors.content.message}</span>
        )}
      </label>

      <button type="submit" className="btn" disabled={isSubmitting || !isValid}>
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
