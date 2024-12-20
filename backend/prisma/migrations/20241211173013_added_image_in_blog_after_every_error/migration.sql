/*
  Warnings:

  - You are about to drop the column `image` on the `Draft` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Draft" DROP COLUMN "image";
