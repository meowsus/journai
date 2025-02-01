import { getEntryWithFullTarotReading } from "@/db/entry";
import { getTarotCardsWithoutIds } from "@/db/tarotCard";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  tarotCardId: z.string().nonempty(),
  isReversed: z.string().optional(),
});

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

  const alreadyPulledTarotCardIds = (
    entry.TarotReading?.TarotCardPulls || []
  ).reduce((acc, tarotCardPull) => {
    if (!tarotCardPull.TarotCard) {
      return acc;
    }

    return [...acc, tarotCardPull.TarotCard.id];
  }, [] as number[]);

  const allTarotCards = await getTarotCardsWithoutIds(
    alreadyPulledTarotCardIds,
  );

  async function createTarotPull(data: FormData) {
    "use server";

    if (!entry) {
      throw new Error("Entry not found");
    }

    const formDataEntries = Object.fromEntries(data);
    const parsed = schema.safeParse(formDataEntries);

    if (!parsed.success) {
      throw new Error("Validation failed");
    }

    const { tarotCardId, isReversed } = parsed.data;

    // Ensure the TarotReading exists
    const tarotReading = await prisma.tarotReading.upsert({
      where: {
        entryId: entry.id,
      },
      update: {},
      create: {
        Entry: {
          connect: {
            id: entry.id,
          },
        },
      },
    });

    // Add the TarotCardPull to the existing TarotReading
    await prisma.tarotCardPull.create({
      data: {
        TarotReading: {
          connect: {
            id: tarotReading.id,
          },
        },
        TarotCard: {
          connect: {
            id: Number(tarotCardId),
          },
        },
        isReversed: isReversed === "on",
      },
    });

    revalidatePath(`/entries/${entry.id}/add/tarot`);
  }

  return (
    <div>
      <h1>Add Tarot Reading to Entry</h1>

      {entry.TarotReading?.TarotCardPulls?.map((tarotCardPull) => (
        <div key={tarotCardPull.id}>
          <p>
            {tarotCardPull.TarotCard?.name}{" "}
            {tarotCardPull.isReversed ? "(Reversed)" : ""}
          </p>
        </div>
      ))}

      {Array.from({ length: 3 - alreadyPulledTarotCardIds.length }).map(
        (_, index) => (
          <form action={createTarotPull} key={index}>
            <div className="card w-96 bg-base-100 shadow-xl">
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
                  <button type="submit" className="btn btn-primary">
                    Add Tarot Pull
                  </button>
                </div>
              </div>
            </div>
          </form>
        ),
      )}
    </div>
  );
}
