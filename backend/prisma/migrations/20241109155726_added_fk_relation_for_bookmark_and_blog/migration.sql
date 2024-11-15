/*
  Warnings:

  - You are about to drop the column `authorName` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `summaryBody` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the column `summaryTitle` on the `Bookmark` table. All the data in the column will be lost.
  - Added the required column `blogId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "authorName",
DROP COLUMN "createdAt",
DROP COLUMN "summaryBody",
DROP COLUMN "summaryTitle",
ADD COLUMN     "blogId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_blogId_fk" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
