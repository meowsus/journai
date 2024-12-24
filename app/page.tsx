import { countEntries } from "@/db/entry";
import Link from "next/link";

export default async function Home() {
  const entryCount = await countEntries();

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">It&apos;s Journai!</h1>
          <p className="py-6">
            Journai is an AI enabled self reflection journaling app that helps
            you understand your thoughts and emotions. This project is based on
            my own journaling practice, but off-loads the work of summarizing
            previous posts to a locally running AI model.
          </p>
          {entryCount > 0 ? (
            <Link href="/entries" className="btn btn-primary">
              View Entries
            </Link>
          ) : (
            <Link href="/entries/new" className="btn btn-primary">
              Create Your First Entry
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
