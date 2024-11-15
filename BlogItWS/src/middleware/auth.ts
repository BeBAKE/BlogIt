import {JwtPayload, verify} from 'jsonwebtoken'
import { Socket } from 'socket.io'

export interface SocketWithAuthorDetails extends Socket {
  authorId : string,
  authorName : string
}

export interface authJWTPayload extends JwtPayload {
  authorId : string,
  authorName : string
}

export const JWT_SECRET = process.env.JWT_SECRET as string



export const auth = async(socket:Socket, next : (err?: Error) => void)=>{
  const err = new Error("Unauthorized")
  try {
    if(!JWT_SECRET){
      next(err)
    }
    const auth_token = socket.handshake.auth.token
    if(!auth_token || !auth_token.includes("Bearer ")){
      next(err)
    }

    const token = auth_token.split(" ")[1]
    if(!token){
      next(err)
    }
    const payload = verify(token as string,JWT_SECRET) as authJWTPayload 
    socket.data.authorId = payload.authorId
    socket.data.authorName = payload.authorName
    next();
  } catch (error) {
    console.log(error)
    next(new Error("Internal Server Error"))
  }
}