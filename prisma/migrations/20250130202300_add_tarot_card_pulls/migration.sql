-- CreateTable
CREATE TABLE "TarotCardPull" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isReversed" BOOLEAN NOT NULL DEFAULT false,
    "impression" TEXT NOT NULL,
    "entryId" INTEGER,
    "tarotCardId" INTEGER NOT NULL,
    CONSTRAINT "TarotCardPull_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TarotCardPull_tarotCardId_fkey" FOREIGN KEY ("tarotCardId") REFERENCES "TarotCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
