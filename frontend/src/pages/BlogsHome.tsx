import { useEffect, useState } from "react"
import axios from "axios"
// import { CreatePostType } from "@bebake/blogit-common"

import BlogHeaderWrapper from "../components/Blogs/BlogHeaderWrapper"
import BlogCard from "../components/Blogs/BlogCard"

import { BACKEND_URL } from "../constants/backendURL"
import PaginationContainer from "../components/Blogs/PaginationContainer"

import { useRecoilValue, useSetRecoilState } from "recoil"
import { PaginationDetails, paginationDetailsAtom } from "../store/atoms/paginationDetailsAtom"
import { currentPageAtom } from "../store/atoms/currentPage"
import { BlogCardSkeleton } from "../components/skeleton/BlogCardSkeleton"

import { Bookmarks } from "../components/Menu/Bookmark"

export type BlogsType = {
  id : string,
  summaryTitle : string,
  summaryBody : string,
  authorName : string,
  createdAt : string,
  authorId : string,
  Bookmark : Bookmarks[]
}

// type BlogsType2 = (BlogsType[number] & {bookmark : string})[]

const BlogsHome = ()=>{
  const [blogs,setBlogs] = useState<BlogsType[]>([])
  const setPaginationDetails = useSetRecoilState<PaginationDetails>(paginationDetailsAtom)
  const currentPage = useRecoilValue(currentPageAtom)
  const [loading ,setLoading ] = useState<boolean>(true)

  useEffect(()=>{
    const token = localStorage.getItem("jwt");    
    (async()=>{
      try {       
        const res = await axios({
          method: "get",
          url: `${BACKEND_URL}/api/v1/blog/bulk/?page=${currentPage}`,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });    
        console.log(res.data.data)    
        setPaginationDetails(res.data.details)
        setBlogs(res.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()
  },[])

  return (
  <section
    className="m-12 flex flex-col items-center h-screen">

      <div id="top"
      className="flex flex-row justify-start items-center w-full md:w-[675px] lg:w-[925px] pb-4 border-b-[1px] gap-7 text-sm">
        <svg className="box-border h-6 w-6 p-1 fill-current text-neutral-500 hover:bg-neutral-100 hover:rounded-[100%]"
        xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px" fillRule="evenodd"><path fillRule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg>
        <BlogHeaderWrapper label={"For You"}/>
        <BlogHeaderWrapper label={"Following"}/>
      </div>

      <div>
        {loading ? (
          Array(8).fill(null).map((_,index)=>{
            return <BlogCardSkeleton index={index} key={index}/>
          })
        ) : (
          blogs.map((e:BlogsType,index:number)=>{
            const date = new Date((e.createdAt)).toString().split(" ")
            const isBookmarked = e.Bookmark.length>=1 ? true : false
            return ( 
              <BlogCard
                id={e.id} // just to avoid error in BlogCard (no other purpose)
                key={index}
                index={index}
                summaryTitle={e.summaryTitle}
                summaryBody={e.summaryBody}
                date={date}
                documentId={e.id}
                authorName={e.authorName}
                isBookmarked={isBookmarked}
                bookmarkId={isBookmarked?e.Bookmark[0].id:undefined}
                />
              )
          })
        )       
      }
      </div>

      <div className="mt-8 justify-self-end">
        <PaginationContainer/>
      </div>



  </section>
  )
}


// (
//   <section
//     className={`h-fit py-10 flex flex-row items-center gap-8 md:gap-20 md:max-w-[675px] lg:max-w-[925px] ${index!==0 ? "border-t-[1px]" : ""}`}>
//     <div 
//       id="blogInfo"
//       className="flex flex-col gap-5">

//       <nav className="flex flex-row justify-start items-center gap-3">
//         <ProfilePic authorName="John WIlliam"/>
//         <h3 className="font-light text-sm"
//         >Peter V.</h3>
//         <h4 className="text-neutral-500 font-light text-sm"
//         >{`${date[1]} ${date[2]}, ${date[3]}`}</h4>
//       </nav>

//       <main className="flex flex-col gap-2"
//         onClick={()=>{
//           navigate(`/blogs/${blogId}`)
//         }}
//       >
//         <p className="font-bold text-2xl">
//           {title}
//         </p>
//         <p className="text-lg text-neutral-500 mb-4">
//           {body.substring(0,141)}...
//         </p>
//       </main>

//       <footer className="flex flex-row justify-between items-center">
//         <div>
//           {/* place holder for tag */}
//           <p className="text-neutral-500">
//             3 min read
//           </p>
//         </div>

//         <div className="flex flex-row gap-3">
//           <svg 
//             className="h-6 fill-current text-neutral-500 hover:text-neutral-800"
//             xmlns="http://www.w3.org/2000/svg"  
//             viewBox="0 0 50 50"
//             ><path d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z"/>
//           </svg>
//           <More/>
//         </div>
//       </footer>

//     </div>

//     <div
//     className="bg-red-100 hidden md:block"
//     id="blogImage">
//       <img className="min-h-32 min-w-40 max-h-32 max-w-40 object-fill"
//       src="/image1.png" alt="Blog's Image"/>
//     </div>
//   </section>
//   )

export default BlogsHome