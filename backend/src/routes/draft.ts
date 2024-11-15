import { Hono } from "hono";
import * as draft from "../controller/draft"

const draftRouter = new Hono<{Bindings : Bindings}>()

// draft
draftRouter.get("/",draft.getAllDrafts)
draftRouter.delete("/:id",draft.deleteDraft)


export default draftRouter