import { NextFunction, Response, Request } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./auth"


export const httpAuth =async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const auth = req.headers.authorization
    if(!auth){
      return res.status(401).json({success : false,message : "No Credentials sent"})
    }
    const token = auth.split(" ")[1]
    if(!token){
      return res.status(401).json({success : false,message : "Invalid Token"})
    }
    const payload = jwt.verify(token as string,JWT_SECRET)
    next();
  } catch (error) {
    return res.status(401).json({success : false,message : "Unauthorized"})
  }
}