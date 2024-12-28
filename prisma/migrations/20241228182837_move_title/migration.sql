/*
  Warnings:

  - You are about to drop the column `title` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `title` to the `EntrySummary` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL
);
INSERT INTO "new_Entry" ("content", "createdAt", "id", "updatedAt") SELECT "content", "createdAt", "id", "updatedAt" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
CREATE TABLE "new_EntrySummary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "entryId" INTEGER NOT NULL,
    CONSTRAINT "EntrySummary_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EntrySummary" ("content", "createdAt", "entryId", "id", "updatedAt") SELECT "content", "createdAt", "entryId", "id", "updatedAt" FROM "EntrySummary";
DROP TABLE "EntrySummary";
ALTER TABLE "new_EntrySummary" RENAME TO "EntrySummary";
CREATE UNIQUE INDEX "EntrySummary_entryId_key" ON "EntrySummary"("entryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
