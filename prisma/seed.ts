import prisma from "@/prisma/client";

const SUITS = ["Swords", "Wands", "Cups", "Pentacles"] as const;

const MINOR_ARCANA = [
  "Ace",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Page",
  "Knight",
  "Queen",
  "King",
] as const;

const MAJOR_ARCANA = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World",
] as const;

async function main() {
  const cardNames = SUITS.reduce((acc, suit) => {
    const cards = MINOR_ARCANA.map((rank) => `${rank} of ${suit}`);
    return [...acc, ...cards];
  }, [] as string[]).concat(MAJOR_ARCANA);

  for (const name of cardNames) {
    await prisma.tarotCard.create({
      data: {
        name,
      },
    });
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
