import {
  addImpressionToTarotCardPullAction,
  removeTarotCardPullAction,
} from "@/app/entries/[entryId]/add/tarot/actions";
import GenerateTarotCardInterpretationButton from "@/components/GenerateTarotCardInterpretationButton";

interface Props {
  tarotCardName?: string;
  isReversed: boolean;
  impression?: string | null;
  entryId: number;
  tarotCardPullId: number;
}

export default function TarotCardPull({
  tarotCardName,
  isReversed,
  impression,
  entryId,
  tarotCardPullId,
}: Props) {
  const tarotCardPullName = `${tarotCardName} ${isReversed ? "(Reversed)" : ""}`;

  return (
    <div className="card relative w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{tarotCardPullName}</h2>

        {impression ? (
          <p>
            <strong>Impression:</strong> {impression}
          </p>
        ) : (
          <>
            <GenerateTarotCardInterpretationButton
              cardName={tarotCardPullName}
            />

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
                  placeholder="What's your impression of this card?"
                  className="textarea input-bordered w-full"
                />
              </label>

              <div className="flex justify-end gap-2">
                <button type="submit" className="btn btn-neutral btn-sm">
                  Save impression
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <form
        action={removeTarotCardPullAction}
        className="absolute -right-2 -top-2"
      >
        <input type="hidden" name="entryId" value={entryId} />
        <input type="hidden" name="tarotCardPullId" value={tarotCardPullId} />

        <button className="btn btn-circle btn-error btn-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
