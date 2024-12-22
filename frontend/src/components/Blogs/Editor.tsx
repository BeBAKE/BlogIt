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
import { useRecoilState } from "recoil";
import coverPhotoAtom from "../../store/atoms/coverPhotoAtom";
import { toast } from "react-toastify";

export interface EditorProps {
  documentId : string
  titleQuill : Quill | undefined,
  bodyQuill : Quill | undefined,
  setTitleQuill : ( value : Dispatch<React.SetStateAction<Quill | undefined>>) =>void,
  setBodyQuill : ( value : Dispatch<React.SetStateAction<Quill | undefined>>) =>void,
}

const Editor = ({ documentId,titleQuill,bodyQuill,setTitleQuill,setBodyQuill } : EditorProps)=>{

  const [file,setFile] = useRecoilState(coverPhotoAtom)

  const titleContainerRef = useRef<HTMLDivElement>(null)
  const bodyContainerRef  = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const socket = useSocket()

  useQuill({titleContainerRef,bodyContainerRef,titleQuill,bodyQuill,setTitleQuill,setBodyQuill})
  
  useGetDocument({socket,documentId,titleQuill,bodyQuill})
  
  useQuillTextChange({socket,documentId,titleQuill,bodyQuill})

  const fileSelection = (e:any)=>{
    const selectedFile = e.currentTarget.files[0]
    if(selectedFile?.size> 8000000){
      toast.warn("Image upload limit is 8 mb")
      return
    }
    setFile(selectedFile)
  }





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

        <div className="mb-8">
          <input 
            type="file" 
            ref={fileRef}
            accept="image/*"
            name="coverPhoto"
            onChange={fileSelection}
            style={{display : "none"}}
          />

          <div className="flex flex-row items-center gap-6">
            <button 
              onClick={()=>fileRef.current?.click()}
              className="ms-4 text-sm bg-gray-800 active:bg-gray-600 text-white h-7 w-20 rounded-xl">
              Add cover
            </button>
            <span 
              className={`${file ? "text-green-800" : 'text-red-800'} text-sm`}>
              {file ? "Cover Uploaded" : "No Cover Picture"}
            </span>
          </div>

        </div>

        <div id="body" ref={bodyContainerRef} className=""></div>  
      </>
    )
  }
  
  
  export default Editor


  // const save = ()=>{
  //   socket?.emit("save-document",documentId,titleQuill?.getContents())
  // }