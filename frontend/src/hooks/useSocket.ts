import { useState, useEffect } from "react"
import { Socket,io } from "socket.io-client"
import { WEBSOCKET_URL } from "../constants/backendURL"
import { useRecoilValue } from "recoil"
import jwtAtom from "../store/atoms/jwtAtom"

export const useSocket = ()=>{
  const [ socket, setSocket ] = useState<Socket>()
  const jwt = useRecoilValue(jwtAtom)

  useEffect(()=>{
    const mySocket = io(WEBSOCKET_URL,{
      auth : (cb) => {
        cb({token : `Bearer ${jwt}` })
      }
    })
    const connectionErrorHandler = (err : any) => {
      console.log("error in websocket connection : ",err.message);
    }
    mySocket.on("connect_error", connectionErrorHandler)

    setSocket(mySocket)

    return ()=>{
      mySocket.disconnect()
      mySocket.off("connect_error", connectionErrorHandler)
    }
  },[WEBSOCKET_URL])

  return socket
}