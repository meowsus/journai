"use client";

import { addImpressionToTarotCardPullAction } from "@/app/entries/[entryId]/add/tarot/actions";
import ModalButton from "@/components/ModalButton";
import { useCompletion } from "ai/react";
import { useActionState, useEffect, useState } from "react";

interface FormActionState {
  success?: boolean;
  error?: string;
}

const addImpressionToTarotCardPullFormAction = async (
  previousState: FormActionState,
  formData: FormData,
) => {
  try {
    await addImpressionToTarotCardPullAction(formData);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add impression" };
  }
};

interface Props {
  tarotCardPullId: number;
  entryId: number;
  cardName: string;
}

export default function TarotMeaningModalButton({
  tarotCardPullId,
  entryId,
  cardName,
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);

  const { completion, complete } = useCompletion({
    api: "/api/ai/completion",
  });

  const [state, formAction, pending] = useActionState(
    addImpressionToTarotCardPullFormAction,
    { success: false },
  );

  useEffect(() => {
    if (state.success && !pending) {
      const modal = document.getElementById(`impression-${tarotCardPullId}`);
      (modal as HTMLDialogElement | null)?.close();
    }
  }, [state.success, pending, tarotCardPullId]);

  return (
    <ModalButton
      modalId={`impression-${tarotCardPullId}`}
      buttonText="View Card Meaning"
      modalTitle="Add Impression"
    >
      <>
        <button
          type="button"
          className="btn btn-sm"
          onClick={async () => {
            setIsGenerating(true);
            await complete(
              `In Rider-Waite Tarot, what is the meaning of "${cardName}"`,
            );
            setIsGenerating(false);
          }}
          disabled={isGenerating}
        >
          {isGenerating && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          Generate meaning
        </button>

        {completion}

        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="entryId" value={entryId} />
          <input type="hidden" name="tarotCardPullId" value={tarotCardPullId} />

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
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={pending}
            >
              {pending && (
                <span className="loading loading-spinner loading-md"></span>
              )}
              Add impression
            </button>
          </div>
        </form>
      </>
    </ModalButton>
  );
}
