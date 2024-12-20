import { Hono } from "hono";
import * as social from "../controller/social"

const socialRouter = new Hono<{Bindings : Bindings}>()

socialRouter.get("/following",social.getFollowing)
socialRouter.post("/followingBlogs",social.getFollowingBlogs)
socialRouter.post("/following",social.createFollowing)
socialRouter.delete("/following",social.removeFollowing)

// socialRouter.get("follower")
// socialRouter.post("follower")

export default socialRouter