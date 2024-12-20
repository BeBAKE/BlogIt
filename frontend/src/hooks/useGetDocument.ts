import Quill from "quill"
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { Socket } from "socket.io-client"
import { publishBtnStatusAtom } from "../store/atoms/publishBtnStatus"

interface GetDocumentProps {
  socket ?: Socket,
  documentId ?: string,
  titleQuill ?: Quill,
  bodyQuill ?: Quill,
}

export const useGetDocument = ({socket,documentId,titleQuill,bodyQuill}:GetDocumentProps)=>{
  const setPublishBtnStatus = useSetRecoilState(publishBtnStatusAtom)

  //! first Socket event to emit and enable titleQuill writing
  useEffect(()=>{
    if(!socket || !titleQuill || !bodyQuill || !documentId) return 
    socket.emit("get-document",documentId)
    socket.once("document-editing",(content)=>{      
      titleQuill.enable()
      bodyQuill.enable()
      setPublishBtnStatus(true)
      
      if(content==='""') {
        console.log("empty title and body");
        return
      }
      // console.log("before seting : ",content.title)
      titleQuill.setContents(content?.title)//content.title
      bodyQuill.setContents(content?.body)//content.body
    })

    socket.on("saved",(msg)=>{
      // console.log("saved : ",msg)
    })

    return ()=>{
      socket.off("saved",(msg)=>{
      // console.log(msg)
      })
    }
  },[socket,documentId,titleQuill,bodyQuill])
}