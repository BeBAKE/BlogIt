import { useEffect, useState } from "react"
import axios from "axios"
// import { CreatePostType } from "@bebake/blogit-common

import BlogHeaderWrapper from "../components/Blogs/BlogHeaderWrapper"
import BlogCard from "../components/Blogs/BlogCard"

import { BACKEND_URL } from "../constants/backendURL"
import PaginationContainer from "../components/Blogs/PaginationContainer"

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { PaginationDetails, paginationDetailsAtom } from "../store/atoms/paginationDetailsAtom"
import { currentPageAtom } from "../store/atoms/currentPage"
import { BlogCardSkeleton } from "../components/skeleton/BlogCardSkeleton"

import { Bookmarks } from "../components/Menu/Bookmark"
import { PaginationAtomId } from "../hooks/PaginationAtomId"
import loadingAtom from "../store/atoms/loadingAtom"
import jwtAtom from "../store/atoms/jwtAtom"
import { toast } from "react-toastify"

export type BlogsType = {
  id : string,
  summaryTitle : string,
  summaryBody : string,
  authorName : string,
  createdAt : string,
  authorId : string,
  Bookmark : Bookmarks[]
  image : string | null
}

export enum PaginationId { 
  following = "following" , 
  blogHome = "blogHome"
}

const BlogsHome = ()=>{
  const [blogs,setBlogs] = useState<BlogsType[]>([])
  const currentPage = useRecoilValue(currentPageAtom(PaginationId.blogHome))
  const [loading ,setLoading ] = useRecoilState(loadingAtom(PaginationId.blogHome))
  const [isError , setIsError] = useState<boolean>(false)
  const setPaginationDetails = useSetRecoilState<PaginationDetails>(paginationDetailsAtom(PaginationId.blogHome))

  const jwt = useRecoilValue(jwtAtom)

  useEffect(()=>{
    // console.log("from BlogHome location : ",window.location.search.split('=')[1])
    (async()=>{
      setLoading(true)
      try {       
        if(jwt==="invalid") {
          toast.error("invalid token")
          throw new Error("invalid token")
        }   
        const res = await axios({
          method: "get",
          url: `${BACKEND_URL}/api/v1/blog/bulk/?page=${currentPage}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          }
        });     
        setPaginationDetails(res.data.details)
        setBlogs(res.data.data)
      } catch (error) {
        console.log(error)
        setIsError(true)
      } finally {
        setLoading(false)
      }
    })()
  },[currentPage])

  return (
  <section
    className="m-12 flex flex-col items-center h-screen">

      <div id="top"
      className="flex flex-row justify-start items-center w-full md:w-[675px] lg:w-[925px] pb-4 border-b-[1px] gap-7 text-sm">
        {/* here "value" is following so that it takes the currentpage and loading of following and not blogHome */}
        <PaginationAtomId.Provider value={PaginationId.following}>
          <BlogHeaderWrapper label={"For You"}/>
          <BlogHeaderWrapper label={"Following"} location="/blogs/following"/>
        </PaginationAtomId.Provider>
      </div>

      {
        isError
        ?
        <div className="text-2xl font-extralight h-96 w-full flex flex-row items-center justify-center">
          Oops! something went wrong
        </div>
        :
        <div>
          {
            loading 
            ?
            Array(8).fill(null).map((_,index)=><BlogCardSkeleton index={index} key={index}/>)
            : 
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
                  authorId={e.authorId}
                  isBookmarked={isBookmarked}
                  bookmarkId={isBookmarked ? e.Bookmark[0].id : undefined}
                  imageName={e.image??undefined}
                  />
                )
            })      
          }
        </div>
      }


      <div className={`${isError ?"hidden":"mt-8 justify-self-end"}`}>
        <PaginationAtomId.Provider value={PaginationId.blogHome}>
          <PaginationContainer/>
        </PaginationAtomId.Provider>
      </div>



  </section>
  )
}

export default BlogsHome