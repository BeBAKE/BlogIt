import { Context, Next } from "hono"
import { createMiddleware } from "hono/factory"
import {date, z, ZodTypeAny} from "zod"

// export type Source = "body" | "params"

export const schemaValidator = <T extends ZodTypeAny>(schema : T)=>{
  return async(c:Context,next:Next)=>{
    try {
      const body = c.req.header("content-type") ? await c.req.json() : undefined
      const parsedData = schema.safeParse(body)
      if(!parsedData.success){
        console.log(parsedData.error)
        const errorMessage = parsedData.error.issues.map((issue : any)=>{
          return `${issue.path.join(".")} :- ${issue.message} `
        })
        return c.json({success : false,message : "Invalid Data",detail : errorMessage},400)
      }
      c.set("parsedData",parsedData.data)
      await next()
    } catch (error:any) {
      console.log("my own eror",error)
      return c.json({message : "Internal Server Error",success : false,date : " Internal Server Error while validating given input data"},400)
    }
  }
}
