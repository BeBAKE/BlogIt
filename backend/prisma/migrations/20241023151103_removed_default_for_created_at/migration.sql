/*
  Warnings:

  - You are about to drop the column `summarybody` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `summarytitle` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `summaryBody` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summaryTitle` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "summarybody",
DROP COLUMN "summarytitle",
ADD COLUMN     "summaryBody" VARCHAR NOT NULL,
ADD COLUMN     "summaryTitle" VARCHAR NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT;
