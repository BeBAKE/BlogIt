import { CreatePostType } from "@bebake/blogit-common"
import More from "../StatusBar/More"
import ProfilePic from "../StatusBar/ProfilePic"
import { useNavigate } from "react-router-dom"

export type BlogProps = { 
  index : number,
  date:string[],
  documentId:string,
  authorName : string,
  isBlog ?: boolean ,
  bookmarkId ?: string
} & CreatePostType

const BlogCard = ({
  index,
  summaryTitle,
  summaryBody,
  date,
  documentId,
  authorName,
  isBlog=true,
  bookmarkId
}:BlogProps)=>{

  const navigate = useNavigate()
  
  
  return (
  <section
    className={`h-fit py-10 flex flex-row items-center justify-between gap-8 md:gap-20 md:max-w-[675px] lg:max-w-[925px] ${index!==0 ? "border-t-[1px]" : ""}`}>
    <div 
      id="blogInfo"
      className="flex flex-col gap-5 w-full">

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
        onClick={()=>{
          navigate(`/blogs/${documentId}`)
        }}>
        <p className="font-bold text-xl">
          {summaryTitle}
        </p>
        <p className="text-base text-neutral-500 mb-4">
          {summaryBody.substring(0,130)}...
        </p>
      </main>

      <footer className="flex flex-row justify-between items-center">
        <div>
          {/* place holder for tag */}
          <p className="text-neutral-500 text-sm">
            3 min read
          </p>
        </div>

        <div id={documentId} className="flex flex-row gap-3">
          {/* Bookmark logo */}
          <svg 
            className={`${isBlog ? "visible" : "invisible"} h-5 fill-current text-neutral-500 hover:text-neutral-800`}
            xmlns="http://www.w3.org/2000/svg"  
            viewBox="0 0 50 50"
            ><path d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z"/>
          </svg>
          <More 
            index={index} 
            isBlog={isBlog}
            documentId={bookmarkId??documentId}/>
        </div>
      </footer>

    </div>

    <div
    className="hidden md:block"
    id="blogImage">
      <img className="min-h-32 min-w-40 max-h-32 max-w-40 object-fill"
      src="/image1.png" alt="Blog's Image"/>
    </div>
  </section>
  )
}

export default BlogCard