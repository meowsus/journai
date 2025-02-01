import { updateEntryAction } from "@/app/entries/actions";
import DeleteEntryButton from "@/components/entries/DeleteEntryButton";
import PublishEntryButton from "@/components/entries/PublishEntryButton";
import { type Entry } from "@prisma/client";

interface EntryFormProps {
  entry: Entry;
}

export default function EntryForm({ entry }: EntryFormProps) {
  return (
    <form action={updateEntryAction} className="flex flex-col gap-4">
      <h1 className="flex items-center justify-between gap-2 text-4xl">
        Entry Form
        {entry.isDraft && <div className="badge badge-secondary">Draft</div>}
      </h1>

      <input name="entryId" type="hidden" value={entry.id} />

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Content</span>
          <span className="label-text-alt text-warning">Required</span>
        </div>
        <textarea
          name="content"
          required={true}
          defaultValue={entry.content}
          placeholder="Type here"
          className="textarea input-bordered w-full"
        />
      </label>

      <div className="flex justify-end gap-2">
        <DeleteEntryButton entryId={entry.id} />
        <PublishEntryButton entryId={entry.id} />

        <button type="submit" className="btn btn-primary btn-sm">
          Update
        </button>
      </div>
    </form>
  );
}
