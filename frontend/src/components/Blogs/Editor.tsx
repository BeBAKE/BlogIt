import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css"
import "../../styles/EditorTitle.css"
import { useSocket } from "../../hooks/useSocket";
import { useQuill } from "../../hooks/useQuill";
import { useGetDocument } from "../../hooks/useGetDocument";
import { useQuillTextChange } from "../../hooks/useQuillTextChange";
import { Dispatch, useRef } from "react";
import Quill from "quill/core";

export interface EditorProps {
  documentId : string
  titleQuill : Quill | undefined,
  bodyQuill : Quill | undefined,
  setTitleQuill : ( value : Dispatch<React.SetStateAction<Quill | undefined>>) =>void,
  setBodyQuill : ( value : Dispatch<React.SetStateAction<Quill | undefined>>) =>void,
}

const Editor = ({ documentId,titleQuill,bodyQuill,setTitleQuill,setBodyQuill } : EditorProps)=>{

  const titleContainerRef = useRef<HTMLDivElement>(null)
  const bodyContainerRef = useRef<HTMLDivElement>(null)

  const socket = useSocket()

  useQuill({titleContainerRef,bodyContainerRef,titleQuill,bodyQuill,setTitleQuill,setBodyQuill})
  
  useGetDocument({socket,documentId,titleQuill,bodyQuill})
  
  useQuillTextChange({socket,documentId,titleQuill,bodyQuill})



  //! to recieve the text-change of other document [purely for collab]
  // useEffect(()=>{
  //   if(!socket || !titleQuill) return 
  //   const recieveTextChangeHandler = (delta:Delta)=>{
  //     titleQuill.updateContents(delta)
  //   }
  //   socket.on("recieve-text-change",recieveTextChangeHandler)

  //   return ()=>{
  //     socket.off("recieve-text-change",recieveTextChangeHandler)
  //   }
  // },[socket,titleQuill])
  //! for body [for collab]
  // useEffect(()=>{
  //   if(!socket || !bodyQuill) return 
  //   const recieveTextChangeHandler = (delta:Delta)=>{
  //     bodyQuill.updateContents(delta)
  //   }
  //   socket.on("recieve-text-change",recieveTextChangeHandler)

  //   return ()=>{
  //     socket.off("recieve-text-change",recieveTextChangeHandler)
  //   }
  // },[socket,titleQuill])



  return (
      <>
        <div id="title" ref={titleContainerRef} className="mb-8"></div>  
        <div id="body" ref={bodyContainerRef} className=""></div>  
      </>
    )
  }
  
  
  export default Editor


  // const save = ()=>{
  //   socket?.emit("save-document",documentId,titleQuill?.getContents())
  // }