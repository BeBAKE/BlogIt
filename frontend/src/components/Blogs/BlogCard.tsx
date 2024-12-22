import { CreatePostType } from "@bebake/blogit-common"
import More from "../StatusBar/More"
import ProfilePic from "../StatusBar/ProfilePic"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { BACKEND_URL, S3_URL } from "../../constants/backendURL"
import axios from "axios"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue } from "recoil"
import jwtAtom from "../../store/atoms/jwtAtom"
import ImagePlaceholder from "../../Logo/ImagePlaceholder"

export type BlogProps = { 
  index : number,
  date:string[],
  documentId:string,
  authorName : string,
  authorId : string,
  isBlog ?: boolean ,
  bookmarkId : string|undefined,
  isBookmarked ?: boolean
  imageName ?: string
  type ?: "PublishedBlog" | "Blog" | "Bookmark"
} & CreatePostType

// type AxiosData = {
//   url : string,
//   method : string,
//   headers : Record<string,string>,
//   data ?: {id : string}
// }

const BlogCard = ({
  index,
  summaryTitle,
  summaryBody,
  date,
  documentId,
  authorName,
  authorId,
  isBlog=true,
  bookmarkId,// used by BmFM.tsx to send remove req in Bookmark page and in case of BlogHome , those who have bookmark - it gives id , and those who doesn't it gives undefined
  isBookmarked,// boolean when from BlogHome , undefined in case of Bookmark.tsx
  imageName,
  type // this is for the PublishedBlog. For publishedBlog ,isBlog is set to be false so that no Bookmark icon is not visible
}:BlogProps)=>{

  const [toggleBookmark, setToggleBookmark] = useState<boolean|undefined>(isBookmarked)
  //@ts-ignore
  const [uuid, setUUID] = useState(uuidv4())
  const navigate = useNavigate()
  const [signedImage , setSignedImage] = useState(undefined)
  const jwt = useRecoilValue(jwtAtom)

  useEffect(()=>{
    if(!imageName) return
    (async()=>{
      try {
        if(jwt==="invalid") {
          toast.error("invalid token")
          throw new Error("invalid token")
        }
        const res2 = await axios(`${S3_URL}/imageUrl/${imageName}`,{
          method : "get",
          headers : {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${jwt}`
          }
        })
        setSignedImage(res2.data.data) 
      } catch (error) {
        console.log(error)
      }
    })()
  },[imageName])
  
  const bookmarkService = {
    toggleBM : async(bookmarkId:string|undefined,documentId:string)=>{
      const config = {
        headers : { Authorization : `Bearer ${jwt}`}
      } 

      return toggleBookmark
        ? await axios.delete(`${BACKEND_URL}/api/v1/blog/bookmark/${bookmarkId}`,config)
        : await axios.post(`${BACKEND_URL}/api/v1/blog/bookmark/${bookmarkId}`,{id : documentId},config)
    }
  }

  const onClickBookmark = async()=>{
    if(isBookmarked===undefined) return

    try {
      if(jwt==="invalid"){
        throw new Error("invalid token")
      }
      setToggleBookmark(!toggleBookmark)
      await bookmarkService.toggleBM(bookmarkId??uuid,documentId)
    } catch (error) {
      console.log(error)
      toast.error("error from server")
    }
  }
  return (
    // md:max-w-[675px] lg:max-w-[925px]
    <section
    className={`h-fit py-10 flex flex-row items-center justify-between gap-8 md:gap-20 md:max-w-[675px] lg:max-w-[925px] ${index!==0 ? "border-t-[1px]" : ""} mx-auto`}>
    <div 
      id="blogInfo"
      className="flex flex-col gap-5 w-4/5">

      <nav className="flex flex-row justify-start items-center gap-3">
        <ProfilePic authorName={authorName}/>
        <h3 className="font-light text-sm">
          {authorName}
        </h3>
        <h4 className="text-neutral-500 font-light text-sm">
          {`${date[1]} ${date[2]}, ${date[3]}`}
        </h4>
      </nav>

      <main className="flex flex-col gap-2"
        onClick={()=>navigate(`/blogs/${documentId}`)}>
        <p className="font-bold text-xl">{summaryTitle}</p>
        <p className="text-base text-neutral-500 mb-4">{summaryBody.substring(0,130)}</p>
      </main>

      <footer className="flex flex-row justify-between items-center">
        <div>
          {/* place holder for tag */}
          <p className="text-neutral-500 text-sm">3 min read</p>
        </div>

        <div className="flex flex-row gap-3">
          {/* Bookmark logo className="size-6"*/} 
          <svg 
            onClick={onClickBookmark}
            className={`${isBlog ? "visible" : "invisible"} size-5 ${toggleBookmark?"fill-black":"text-neutral-500 hover:text-neutral-800"} `}
            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>

          <More 
            /*
            bookmarkId - when BlogCard is used by "Bookmakark.tsx",
            documentId - as of now no use in More , just  used in BlogCard for to open a single blog
            */
            type={type}
            index={index} 
            isBlog={isBlog}
            documentId={ type==="PublishedBlog" || isBlog ? documentId : bookmarkId as string}
            imageName={imageName}
            authorId={authorId}
            />
        </div>
      </footer>

    </div>

    <div
    className={`hidden md:block`}
    id="blogImage">
      {
      signedImage 
      ? 
        <img className="min-h-32 min-w-40 max-h-32 max-w-40 object-fill"
        src={signedImage} alt="Blog's Image"/>
      :
        <ImagePlaceholder/>
      }
    </div>
  </section>
  )
}

export default BlogCard