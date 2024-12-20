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
  const setPaginationDetails = useSetRecoilState<PaginationDetails>(paginationDetailsAtom(PaginationId.blogHome))

  useEffect(()=>{
    // console.log("from BlogHome location : ",window.location.search.split('=')[1])
    const token = localStorage.getItem("jwt");    
    (async()=>{
      setLoading(true)
      try {       
        const res = await axios({
          method: "get",
          url: `${BACKEND_URL}/api/v1/blog/bulk/?page=${currentPage}`,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });     
        setPaginationDetails(res.data.details)
        setBlogs(res.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()
  },[currentPage])

  return (
  <section
    className="m-12 flex flex-col items-center h-screen">

      <div id="top"
      className="flex flex-row justify-start items-center w-full md:w-[675px] lg:w-[925px] pb-4 border-b-[1px] gap-7 text-sm">
        {/* <svg className="box-border h-6 w-6 p-1 fill-current text-neutral-500 hover:bg-neutral-100 hover:rounded-[100%]"
        xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px" fillRule="evenodd"><path fillRule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/></svg> */}
        {/* here value is following so that it takes the currentpage and loading of following and not blogHome */}
        <PaginationAtomId.Provider value={PaginationId.following}>
          <BlogHeaderWrapper label={"For You"}/>
          <BlogHeaderWrapper label={"Following"} location="/blogs/following"/>
        </PaginationAtomId.Provider>
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
                authorId={e.authorId}
                isBookmarked={isBookmarked}
                bookmarkId={isBookmarked ? e.Bookmark[0].id : undefined}
                imageName={e.image??undefined}
                />
              )
          })
        )       
      }
      </div>

      <div className="mt-8 justify-self-end">
        <PaginationAtomId.Provider value={PaginationId.blogHome}>
          <PaginationContainer/>
        </PaginationAtomId.Provider>
      </div>



  </section>
  )
}

export default BlogsHome