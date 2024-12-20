import { Context, Hono } from "hono"
import quotes from '../quote'

const indexRouter = new Hono<{Bindings : Bindings}>()


import blogsRouter from "./blog"
import userRouter from "./user"
import draftRouter from "./draft"
import socialRouter from "./social"

indexRouter.route('/',userRouter)
indexRouter.route('/blog',blogsRouter)
indexRouter.route('/draft',draftRouter)
indexRouter.route('/social',socialRouter)

indexRouter.get("/generate",async(c)=>{
  const quotesData = quotes
  const random = Math.floor(Math.random() * 40);
  const data = quotesData[random]
  return c.json({success : true , message : "quote fetched successfully",data : data},200)
})

export default indexRouter

