-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "content" TEXT NOT NULL
);
INSERT INTO "new_Entry" ("content", "createdAt", "id", "updatedAt") SELECT "content", "createdAt", "id", "updatedAt" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
