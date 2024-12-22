import { createEntryAction } from "@/app/entries/actions";
import EntryForm from "@/app/entries/EntryForm";

export default function Home() {
  return <EntryForm createEntryAction={createEntryAction} />;
}
