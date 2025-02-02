"use client";

import { useCompletion } from "ai/react";
import { useState } from "react";

interface Props {
  cardName: string;
}

export default function GenerateTarotCardInterpretationButton({
  cardName,
}: Props) {
  const [showButton, setShowButton] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const { completion, complete } = useCompletion({
    api: "/api/ai/completion",
  });

  const onClick = async () => {
    setIsGenerating(true);
    await complete(
      `In Rider-Waite Tarot, what is the meaning of "${cardName}"`,
    );
    setIsGenerating(false);
    setShowButton(false);
  };

  return (
    <>
      {showButton && (
        <button
          type="button"
          className="btn btn-sm"
          onClick={onClick}
          disabled={isGenerating}
        >
          {isGenerating && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          {isGenerating ? "Generating..." : "Generate meaning"}
        </button>
      )}

      {completion && <p className="grow">{completion}</p>}
    </>
  );
}
