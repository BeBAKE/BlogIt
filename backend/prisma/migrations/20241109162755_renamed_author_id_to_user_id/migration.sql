/*
  Warnings:

  - You are about to drop the column `authorId` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_authorId_fk";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_authorId_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
