/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Following" (
    "id" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,

    CONSTRAINT "Following_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "follower_following_index" ON "Following"("followingId", "followerId");

-- CreateIndex
CREATE UNIQUE INDEX "follower_following_unique" ON "Following"("followerId", "followingId");

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Follwing_User_fk" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Follower_User_fk" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
