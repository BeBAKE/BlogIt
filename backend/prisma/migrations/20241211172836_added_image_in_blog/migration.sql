/*
  Warnings:

  - You are about to drop the column `image` on the `Bookmark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Draft" ADD COLUMN     "image" TEXT;
