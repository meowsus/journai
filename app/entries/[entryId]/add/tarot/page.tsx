import AddTarotCardPullForm from "@/app/entries/[entryId]/add/tarot/AddTarotCardPullForm";
import TarotCardPull from "@/app/entries/[entryId]/add/tarot/TarotCardPull";
import { getEntryWithFullTarotReading } from "@/db/entry";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    entryId: string;
  }>;
}

export default async function AddTarotToEntryPage({ params }: Props) {
  const { entryId } = await params;

  const entry = await getEntryWithFullTarotReading(Number(entryId));

  if (!entry) {
    notFound();
  }

  const addedTarotCardIds = (entry.TarotReading?.TarotCardPulls || []).reduce(
    (acc, tarotCardPull) => {
      if (!tarotCardPull.TarotCard) {
        return acc;
      }

      return [...acc, tarotCardPull.TarotCard.id];
    },
    [] as number[],
  );

  const remainingPulls = 3 - addedTarotCardIds.length;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="flex items-center justify-between gap-2 text-4xl">
        Add Tarot to New Entry
      </h1>

      <p>
        <strong>Content:</strong> {entry.content}
      </p>

      <div className="flex flex-col gap-4">
        {entry.TarotReading?.TarotCardPulls?.map((tarotCardPull) => (
          <TarotCardPull
            key={tarotCardPull.id}
            name={tarotCardPull.TarotCard?.name}
            isReversed={tarotCardPull.isReversed}
            impression={tarotCardPull.impression}
            entryId={entry.id}
            tarotCardPullId={tarotCardPull.id}
          />
        ))}

        {remainingPulls > 0 && (
          <AddTarotCardPullForm
            entryId={entry.id}
            addedTarotCardIds={addedTarotCardIds}
          />
        )}
      </div>
    </div>
  );
}
