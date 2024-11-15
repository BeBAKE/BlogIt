import {Context } from "hono"
import getPrisma from "../db"
import { Prisma } from "@prisma/client/edge"
import { sign } from "hono/jwt"
import { JWTPayload } from "hono/utils/jwt/types"
import { SigninType, SignupType } from "@bebake/blogit-common"

export const signin = async(c:Context)=>{
  const prisma = await getPrisma(c.env.DATABASE_URL)
  try {
    const {email , password} : SigninType = c.get("parsedData")
    
    const user = await prisma.user.findUnique({
      where : {
        email : email ,
        password : password
      }
    })
    if(!user){
      return c.json({success : false,message : "Either email or password is incorrect"},401)
    }
    const payload = {
      authorId : user.id,
      authorName : user.fullName,
      exp : Math.floor(Date.now()/1000 + 60 * 60 *24 ),
      iat : Math.floor(Date.now()/1000)
    }
    const token = await sign(payload , c.env.JWT_SECRET)
    return c.json({success:true,message : "signin successful",data : token},200)
  } catch (error:any) {
    if(error instanceof ( Prisma.PrismaClientKnownRequestError ||   Prisma.PrismaClientUnknownRequestError || Prisma.PrismaClientValidationError)  ){
      return c.json({success : false,message : "DataValidation error while signup"},400)
    }   
    return c.json({success : false,message : "Internal Server error"},500)
  }
}

export const signup = async(c:Context)=>{
  const prisma = await getPrisma(c.env.DATABASE_URL)
  try {
    const {email ,fullname , password} : SignupType = c.get("parsedData")
    const user = await prisma.user.create({
      data : {
        fullName : fullname,
        email : email,
        password : password
      }
    })
    const payload : JWTPayload = {
      authorId : user.id,
      authorName : user.fullName,
      exp : Math.floor(Date.now() / 1000 + 60 * 60 *24 ),
      iat : Math.floor(Date.now()/1000)
    }
    const token = await sign(
      payload,
      c.env.JWT_SECRET
    ) 
    return c.json({success : true,message : "signup successful",data : token},200)
  } catch (error:any) {
    if(error instanceof ( Prisma.PrismaClientKnownRequestError ||   Prisma.PrismaClientUnknownRequestError || Prisma.PrismaClientValidationError)  ){
      return c.json({success : false,message : "DataValidation error while signup"},400)
    }
    return c.json({success : false,message : "Internal Server error"},500)
  }
}




