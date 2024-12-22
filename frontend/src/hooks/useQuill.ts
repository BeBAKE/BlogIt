// import { useState, useEffect } from "react";
// import Quill from "quill";
// import { useRecoilState } from "recoil";
// import { titleQuillAtom } from "../store/atoms/titleQuillAtom";
// import { bodyQuillAtom } from "../store/atoms/bodyQuillAtom";

// interface UseQuillProps {
//   titleContainerRef : React.RefObject<HTMLDivElement>,
//   bodyContainerRef : React.RefObject<HTMLDivElement>
// }

// export const useQuill = ({titleContainerRef,bodyContainerRef,t,b,setT,setB}:any)=>{
//   // const [ titleQuill, setTitleQuill  ] = useState<Quill>()
//   // const [ bodyQuill, setBodyQuill  ] = useState<Quill>()

//   // const [ titleQuill, setTitleQuill ] = useRecoilState(titleQuillAtom)
//   // const [ bodyQuill, setBodyQuill ] = useRecoilState(bodyQuillAtom)

//   useEffect(()=>{
//     const titleToolbarDiv = document.createElement("div")
//     titleToolbarDiv.setAttribute("id","titleToolbarDiv")
//     if(titleContainerRef.current){
//       titleContainerRef.current.append(titleToolbarDiv)
//     }
//     const bodyToolbarDiv = document.createElement("div")
//     bodyToolbarDiv.setAttribute("id","bodyToolbarDiv")
//     if(bodyContainerRef.current){
//       bodyContainerRef.current.append(bodyToolbarDiv)
//     }

//     const titleToolbarOptions = [
//       [{ 'color': ['gray','black'] }],  
//       [{ 'size': ['small', false] }], 
//       ['clean']     
//     ]
//     const bodyToolbarOptions = [
//       ['bold','italic','underline','strike'],
//       [{ 'header': [ 2, 3, false] }],
//       [{ 'color': ['red','blue','green','yellow','pink','orange','brown','black','white'] }],  
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
//       ['blockquote', 'code-block'],
//       ['clean']   
//     ]

//     const quillTitleLocal = new Quill("#titleToolbarDiv",{
//     theme : "bubble",
//     placeholder : "Title",
//     modules : {
//       toolbar : titleToolbarOptions
//       }
//     })
//     const quillBodyLocal = new Quill("#bodyToolbarDiv",{
//     theme : "bubble",
//     placeholder : "Body",
//     modules : {
//       toolbar : bodyToolbarOptions,
//       }
//     })
//     // console.log("inside the useQuill , title",titleQuill);
//     // console.log("inside the useQuill , body",bodyQuill);
//     console.log("inside the useQuill , title",t);
//     console.log("inside the useQuill , body",b);
    
//     // quillTitleLocal.disable()
//     // setTitleQuill(quillTitleLocal)

//     // quillBodyLocal.disable()
//     // setBodyQuill(quillBodyLocal)
//     quillTitleLocal.disable()
//     setT(quillTitleLocal)

//     quillBodyLocal.disable()
//     setB(quillBodyLocal)
    
    
//     return ()=>{
//       if(titleContainerRef.current)
//       titleContainerRef.current.innerHTML = ""
//       if(bodyContainerRef.current)
//       bodyContainerRef.current.innerHTML = ""
//     }
//   },[])

//   // return { t, b }
// }



//!atoms
import { useEffect } from "react";
import Quill from "quill";

// interface UseQuillProps {
//   titleContainerRef : React.RefObject<HTMLDivElement>,
//   bodyContainerRef : React.RefObject<HTMLDivElement>
// }
//@ts-ignore
export const useQuill = ({titleContainerRef,bodyContainerRef,titleQuill,bodyQuill,setTitleQuill,setBodyQuill}:any)=>{


  useEffect(()=>{
    const titleToolbarDiv = document.createElement("div")
    titleToolbarDiv.setAttribute("id","titleToolbarDiv")
    if(titleContainerRef.current){
      titleContainerRef.current.append(titleToolbarDiv)
    }
    const bodyToolbarDiv = document.createElement("div")
    bodyToolbarDiv.setAttribute("id","bodyToolbarDiv")
    if(bodyContainerRef.current){
      bodyContainerRef.current.append(bodyToolbarDiv)
    }

    const titleToolbarOptions = [
      [{ 'color': ['gray','black'] }],  
      [{ 'size': ['small', false] }], 
      ['clean']     
    ]
    const bodyToolbarOptions = [
      ['bold','italic','underline','strike'],
      [{ 'header': [ 2, 3, false] }],
      [{ 'color': ['red','blue','green','yellow','pink','orange','brown','black','white'] }],  
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      ['blockquote', 'code-block'],
      ['clean']   
    ]

    const quillTitleLocal = new Quill("#titleToolbarDiv",{
    theme : "bubble",
    placeholder : "Title",
    modules : {
      toolbar : titleToolbarOptions
      }
    })
    const quillBodyLocal = new Quill("#bodyToolbarDiv",{
    theme : "bubble",
    placeholder : "Body",
    modules : {
      toolbar : bodyToolbarOptions,
      }
    })
        
    quillTitleLocal.disable()
    setTitleQuill(quillTitleLocal)

    quillBodyLocal.disable()
    setBodyQuill(quillBodyLocal)
    
    return ()=>{
      if(titleContainerRef.current)
      titleContainerRef.current.innerHTML = ""
      if(bodyContainerRef.current)
      bodyContainerRef.current.innerHTML = ""
    }
  },[])

}