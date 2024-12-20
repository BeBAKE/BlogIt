import { useEffect, useRef, useCallback } from "react";
import Quill from "quill";
import { Delta } from "quill/core";
import { Socket } from "socket.io-client";

interface QuillTextChangeProps {
  socket ?: Socket,
  documentId ?: string,
  titleQuill ?: Quill,
  bodyQuill ?:Quill,
}


export const useQuillTextChange = (
  {
    socket,
    documentId,
    titleQuill,
    bodyQuill,
  } : QuillTextChangeProps) => {

  const intervalIdTitle = useRef<any>(null)
  const intervalIdBody = useRef<any>(null)
  

  const debouncing = useCallback((type : 'title'|'body' , intervalId : React.MutableRefObject<any>, quillInstance : Quill )=>{
    clearTimeout(intervalId.current)
    intervalId.current = setTimeout(() => {
      socket?.emit("save-document",documentId,quillInstance?.getContents(),type)
      // console.log(`times up ${type}!`)
    }, 1000);
  },[documentId,titleQuill,bodyQuill])



  //! to set titleQuill text-change
  useEffect(()=>{
    if(!socket || !titleQuill || !bodyQuill ) return 

    const titleQuillTextHandler = (delta:Delta,oldDelta:Delta,source:string)=>{
      if(source!=='user') return  
      debouncing("title",intervalIdTitle,titleQuill)//! db saving
      // socket.emit("text-change",delta) //! collab  
    }
    const bodyQuillTextHandler = (delta:Delta,oldDelta: Delta,source: string)=>{
      if(source!=='user') return  
      debouncing("body",intervalIdBody,bodyQuill)//! db saving
      // socket.emit("text-change",delta) //! collab  
    }

    titleQuill.on(Quill.events.TEXT_CHANGE,titleQuillTextHandler)
    bodyQuill.on(Quill.events.TEXT_CHANGE,bodyQuillTextHandler)
    
    return ()=>{
      titleQuill.off(Quill.events.TEXT_CHANGE,titleQuillTextHandler)
      bodyQuill.on(Quill.events.TEXT_CHANGE,bodyQuillTextHandler)
    }

  },[socket,titleQuill,bodyQuill])


}