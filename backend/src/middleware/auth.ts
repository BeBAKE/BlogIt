import { Context,Next } from "hono"
import { createMiddleware } from "hono/factory"
import { verify } from "hono/jwt"


export const auth = createMiddleware
(async(c:Context,next:Next)=>{
  try {
    const auth_header = c.req.header("Authorization")
    if(!auth_header?.includes("Bearer")){
      return c.json({success : false,message : "Invalid Token"},401)
    }
    const token = auth_header.split(" ")[1]
    if(!token){
      return c.json({success : false,message : "Unauthorized"},401)
    }
    const payload = await verify(token as string,c.env.JWT_SECRET)
    c.set("authorId",`${payload.authorId}`)
    c.set("authorName",`${payload.authorName}`)
    await next();
  } catch (error) {
    return c.json({success : false,message : "Unauthorized"},401)
  }
})