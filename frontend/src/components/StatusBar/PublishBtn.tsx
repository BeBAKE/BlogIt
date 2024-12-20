import axios from "axios";
import Quill, { Delta } from "quill/core";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { publishBtnStatusAtom } from "../../store/atoms/publishBtnStatus";
import { BACKEND_URL, S3_URL } from "../../constants/backendURL";
import coverPhotoAtom from "../../store/atoms/coverPhotoAtom";

export interface PublishBtnProp {
  documentId: string,
  titleQuill : Quill | undefined,
  bodyQuill : Quill | undefined,
  // coverPhoto : Blob | undefined
}


const PublishBtn = ({documentId,titleQuill,bodyQuill}:PublishBtnProp)=>{
  const nav = useNavigate()
  const [ publishBtnStatus, setPublishBtnStatus] = useRecoilState(publishBtnStatusAtom)
  const [coverPhoto,setCoverPhoto] = useRecoilState(coverPhotoAtom)



  const publish = () => {
    if(publishBtnStatus===false) return
    
    const sendToBlog = async()=>{
      if(!titleQuill || !bodyQuill || !documentId) return 
      setPublishBtnStatus(false)
      titleQuill.disable()
      bodyQuill.disable()

      const title = titleQuill?.getContents()
      const body = bodyQuill?.getContents()

      if(!title && !body) return

      try {
        const data = {
          id : documentId,
          title : title as Delta,
          body : body as Delta,
        }
        const res = await axios(`${BACKEND_URL}/api/v1/blog/${documentId}`,{
          method : "post",
          headers : {
            Authorization : `Bearer ${localStorage.getItem("jwt")}`
          },
          data : data
        })

        if(res.data.success && coverPhoto){
          const formData = new FormData()
          formData.append("coverPhoto",coverPhoto)
          formData.append("id",documentId)
          // here i omitted await - so that for image uplaod there shouldn't be any delay . 
          // It causes problem - after publishing when screen goes back to the home page, to see the image of the new uploaded article, reload is required because by that time the express backend has not updated the image in the blog table 
          axios(`${S3_URL}/upload`,{
            method : "post",
            data : formData,
            headers : {
              "Content-Type" : "multipart/form-data",
              Authorization : `Bearer ${localStorage.getItem("jwt")}`
            }
          })
        }
        toast.success("Hurray! Article publised 🎉")
        setPublishBtnStatus(false)
        setCoverPhoto(undefined)
        nav("/blogs")
      } catch (error) {
        titleQuill.enable()
        bodyQuill.enable()
        setPublishBtnStatus(true)
        console.log("error while publishing : ",error)
      }
    }

    sendToBlog()
  }
  
  // 65 134 45 bg-[rgba(207,230,202)] 
  return (
    <>
    <button
      onClick={publish}
      className={`text-[12px] text-white 
        ${publishBtnStatus ? "bg-[rgb(65,135,45)]" : "bg-[rgb(207,230,202)]"}
        active:bg-[rgb(41, 85, 28)]
        rounded-xl px-2.5 py-[4px]`}>
      Publish
    </button>
    {/* <button onClick={()=>}>check</button> */}
    </>
  )
}

export default PublishBtn