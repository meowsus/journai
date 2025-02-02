import {
  addImpressionToTarotCardPullAction,
  removeImpressionFromTarotCardPullAction,
  removeTarotCardPullAction,
} from "@/app/entries/[entryId]/add/tarot/actions";

interface Props {
  name?: string;
  isReversed: boolean;
  impression?: string | null;
  entryId: number;
  tarotCardPullId: number;
}

export default function TarotCardPull({
  name,
  isReversed,
  impression,
  entryId,
  tarotCardPullId,
}: Props) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {name} {isReversed && "(Reversed)"}
        </h2>

        <form action={removeTarotCardPullAction} className="inline">
          <input type="hidden" name="entryId" value={entryId} />
          <input type="hidden" name="tarotCardPullId" value={tarotCardPullId} />

          <button type="submit" className="link link-secondary">
            Remove card?
          </button>
        </form>

        {impression ? (
          <>
            <p>
              <strong>Impression:</strong> {impression}
            </p>
            <form
              action={removeImpressionFromTarotCardPullAction}
              className="inline"
            >
              <input type="hidden" name="entryId" value={entryId} />
              <input
                type="hidden"
                name="tarotCardPullId"
                value={tarotCardPullId}
              />

              <button type="submit" className="link link-secondary">
                Remove impression?
              </button>
            </form>
          </>
        ) : (
          <form
            action={addImpressionToTarotCardPullAction}
            className="flex flex-col gap-4"
          >
            <input type="hidden" name="entryId" value={entryId} />
            <input
              type="hidden"
              name="tarotCardPullId"
              value={tarotCardPullId}
            />

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Impression</span>
              </div>
              <textarea
                name="impression"
                placeholder="Type here"
                className="textarea input-bordered w-full"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button type="submit" className="btn btn-primary btn-sm">
                Add impression
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
