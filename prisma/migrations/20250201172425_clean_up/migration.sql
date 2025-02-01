/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TarotCard` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TarotCard` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TarotCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_TarotCard" ("id", "name") SELECT "id", "name" FROM "TarotCard";
DROP TABLE "TarotCard";
ALTER TABLE "new_TarotCard" RENAME TO "TarotCard";
CREATE TABLE "new_TarotCardPull" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isReversed" BOOLEAN NOT NULL DEFAULT false,
    "impression" TEXT,
    "tarotReadingId" INTEGER,
    "tarotCardId" INTEGER,
    CONSTRAINT "TarotCardPull_tarotReadingId_fkey" FOREIGN KEY ("tarotReadingId") REFERENCES "TarotReading" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TarotCardPull_tarotCardId_fkey" FOREIGN KEY ("tarotCardId") REFERENCES "TarotCard" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TarotCardPull" ("createdAt", "id", "impression", "isReversed", "tarotCardId", "tarotReadingId", "updatedAt") SELECT "createdAt", "id", "impression", "isReversed", "tarotCardId", "tarotReadingId", "updatedAt" FROM "TarotCardPull";
DROP TABLE "TarotCardPull";
ALTER TABLE "new_TarotCardPull" RENAME TO "TarotCardPull";
CREATE UNIQUE INDEX "TarotCardPull_tarotReadingId_tarotCardId_key" ON "TarotCardPull"("tarotReadingId", "tarotCardId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
