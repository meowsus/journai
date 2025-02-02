import { createTarotCardPullAction } from "@/app/entries/[entryId]/add/tarot/actions";
import { getTarotCardsWithoutIds } from "@/db/tarotCard";

interface Props {
  entryId: number;
  addedTarotCardIds: number[];
}

export default async function AddTarotCardPullForm({
  entryId,
  addedTarotCardIds,
}: Props) {
  const allTarotCards = await getTarotCardsWithoutIds(addedTarotCardIds);

  return (
    <form action={createTarotCardPullAction}>
      <input type="hidden" name="entryId" value={entryId} />

      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Card Name</span>
            </div>
            <select
              className="select select-bordered"
              name="tarotCardId"
              defaultValue="0"
            >
              <option disabled value="0">
                Pick one
              </option>
              {allTarotCards.map((tarotCard) => (
                <option key={tarotCard.id} value={tarotCard.id}>
                  {tarotCard.name}
                </option>
              ))}
            </select>
          </label>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Reversed?</span>
              <input
                type="checkbox"
                name="isReversed"
                className="checkbox"
                value="on"
              />
            </label>
          </div>

          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary btn-sm">
              Add Card to Reading
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
