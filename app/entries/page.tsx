import { getAllEntries } from "@/db/entry";

export default async function Home() {
  const entries = await getAllEntries();

  if (entries.length === 0) {
    return (
      <div>
        <div>No entries found</div>
      </div>
    );
  }

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>
          {entry.title}: {entry.content}
        </div>
      ))}
    </div>
  );
}
