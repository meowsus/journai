import { getAllEntries } from "@/data/entry.data";

export default async function Home() {
  const entries = await getAllEntries();

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>{entry.title}</div>
      ))}
    </div>
  );
}
