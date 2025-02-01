import { createEntry } from "@/db/entry";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  content: z.string().trim().min(1, {
    message: "Content is required",
  }),
});

export default async function NewEntryPage() {
  async function createEntryAction(data: FormData) {
    "use server";

    const formDataEntries = Object.fromEntries(data);
    const parsed = schema.safeParse(formDataEntries);

    if (!parsed.success) {
      throw new Error("Validation failed");
    }

    const entry = await createEntry(parsed.data);

    redirect(`/entries/${entry.id}/add/tarot`);
  }

  return (
    <form action={createEntryAction} className="flex flex-col gap-4">
      <h1 className="flex items-center justify-between gap-2 text-4xl">
        Add New Entry
      </h1>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Content</span>
          <span className="label-text-alt text-warning">Required</span>
        </div>
        <textarea
          name="content"
          required={true}
          placeholder="Type here"
          className="textarea input-bordered w-full"
        />
      </label>

      <div className="flex justify-end gap-2">
        <button type="submit" className="btn btn-primary btn-sm">
          Save
        </button>
      </div>
    </form>
  );
}
