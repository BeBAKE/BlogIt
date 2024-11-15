/*
  Warnings:

  - Added the required column `bookmarkedAt` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "bookmarkedAt" TIMESTAMP(3) NOT NULL;
