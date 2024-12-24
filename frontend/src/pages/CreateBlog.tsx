import Logo from "../components/StatusBar/Logo"
import ProfilePic from "../components/StatusBar/ProfilePic"
import BellIcon from "../components/StatusBar/BellIcon"
// import More from "../components/StatusBar/More"
import PublishBtn from "../components/StatusBar/PublishBtn"
import Editor from "../components/Blogs/Editor"
import { useParams } from "react-router-dom"
import Quill from "quill"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { userNameSelector } from "../store/selector/userName"


const CreateBlog = ()=>{
  const {id : documentId} = useParams()
  const [ titleToPublish, setTitleToPublish ] = useState<Quill>()
  const [ bodyToPublish, setBodyToPublish ] = useState<Quill>()

  const userName = useRecoilValue(userNameSelector)

  const setTitleQuill = (value : any)=>{
    setTitleToPublish(value)
  }
  const setBodyQuill = (value : any)=>{
    setBodyToPublish(value)
  }

  return (
  <section
    className="mx-3 lg:mx-auto lg:max-w-[1000px] my-3">
    <header
      id="CreateBlogStatusBar"
      className="flex flex-row items-center justify-between md:mb-12 mb-10">
        <div
          className="flex flex-row items-center gap-3">
          <Logo/>
          <h1 className="text-xs md:text-sm"
          >Draft for {userName.split(" ")[0].substring(0,15)}</h1>
        </div>
        <div
          className="flex flex-row items-center gap-6">
            <PublishBtn 
              documentId={documentId as string} 
              titleQuill={titleToPublish}
              bodyQuill={bodyToPublish}
            />
            <BellIcon/>
            <ProfilePic authorName={userName}/>
        </div>
    </header>

    <main
    className="mx-auto max-w-[800px]">
      <Editor 
        documentId={documentId as string} 
        titleQuill={titleToPublish}
        bodyQuill={bodyToPublish}
        setTitleQuill={setTitleQuill}
        setBodyQuill={setBodyQuill}
      />
    </main>
    
  </section>
  )
}

export default CreateBlog