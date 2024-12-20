-- DropIndex
DROP INDEX "follower_following_index";

-- CreateIndex
CREATE INDEX "following_index" ON "Following"("followingId");

-- CreateIndex
CREATE INDEX "follower_index" ON "Following"("followerId");
