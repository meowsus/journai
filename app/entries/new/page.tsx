import { createEntryAction } from "@/app/entries/actions";
import EntryForm from "@/components/EntryForm";

export default function Home() {
  return <EntryForm createEntryAction={createEntryAction} />;
}
