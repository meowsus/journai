import Hero from "@/components/Hero";
import { countEntries } from "@/db/entry";
import Link from "next/link";

export default async function Home() {
  const entryCount = await countEntries();

  return (
    <Hero
      title="It's Journai!"
      subtitle="Journai is an AI enabled self reflection journaling app that helps you understand your thoughts and emotions. This project is based on my own journaling practice, but off-loads the work of summarizing previous posts to a locally running AI model."
    >
      {entryCount > 0 ? (
        <Link href="/entries" className="btn btn-primary">
          View Entries
        </Link>
      ) : (
        <Link href="/entries/new" className="btn btn-primary">
          Create Your First Entry
        </Link>
      )}
    </Hero>
  );
}
