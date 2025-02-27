import { addImpressionToTarotReadingAction } from "@/app/entries/[entryId]/add/tarot/actions";
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
      <h1 className="flex items-center justify-center gap-2 text-4xl">
        Add Tarot to New Entry
      </h1>

      <p className="text-center">{entry.content}</p>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          {entry.TarotReading?.TarotCardPulls?.map((tarotCardPull) => (
            <TarotCardPull
              key={tarotCardPull.id}
              tarotCardName={tarotCardPull.TarotCard?.name}
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

        {entry.TarotReading?.impression ? (
          <p>
            <strong>Impression:</strong> {entry.TarotReading?.impression}
          </p>
        ) : (
          <form
            action={addImpressionToTarotReadingAction}
            className="flex flex-col gap-4"
          >
            <input type="hidden" name="entryId" value={entry.id} />
            <input
              type="hidden"
              name="tarotReadingId"
              value={entry.TarotReading?.id}
            />

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Impression</span>
              </div>
              <textarea
                name="impression"
                placeholder="What is your overall impression of this tarot reading?"
                className="textarea input-bordered w-full"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
