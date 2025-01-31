-- AlterTable
ALTER TABLE "TarotReading" ADD COLUMN "impression" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TarotCardPull" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isReversed" BOOLEAN NOT NULL DEFAULT false,
    "impression" TEXT,
    "tarotReadingId" INTEGER,
    "tarotCardId" INTEGER NOT NULL,
    CONSTRAINT "TarotCardPull_tarotReadingId_fkey" FOREIGN KEY ("tarotReadingId") REFERENCES "TarotReading" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TarotCardPull_tarotCardId_fkey" FOREIGN KEY ("tarotCardId") REFERENCES "TarotCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TarotCardPull" ("createdAt", "id", "impression", "isReversed", "tarotCardId", "tarotReadingId", "updatedAt") SELECT "createdAt", "id", "impression", "isReversed", "tarotCardId", "tarotReadingId", "updatedAt" FROM "TarotCardPull";
DROP TABLE "TarotCardPull";
ALTER TABLE "new_TarotCardPull" RENAME TO "TarotCardPull";
CREATE UNIQUE INDEX "TarotCardPull_tarotCardId_key" ON "TarotCardPull"("tarotCardId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
