import Quill from "quill";
import { useEffect, useRef } from "react";

interface ReadOnlyEditorProps {
  content : string,
  id : string
}

const ReadOnlyEditor = ({content,id}:ReadOnlyEditorProps)=>{
  const editorRef = useRef<HTMLHeadingElement>(null)

  useEffect(()=>{
    const quill = new Quill(`#${id}`, {
      readOnly: true,
      modules: {
        toolbar: null
      },
      theme: 'snow'
    });

    quill.setContents(JSON.parse(content))

    return ()=>{
      if(editorRef.current) editorRef.current.innerHTML = ""
    }
  },[content])


  return (
  <h1 id={id} ref={editorRef}></h1>
)
}

export default ReadOnlyEditor