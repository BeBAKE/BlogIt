import { useEffect, useState } from "react"
import { BlogsType, PaginationId } from "./BlogsHome"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { PaginationDetails, paginationDetailsAtom } from "../store/atoms/paginationDetailsAtom"
import { currentPageAtom } from "../store/atoms/currentPage"
import axios from "axios"
import { BACKEND_URL } from "../constants/backendURL"
import PaginationContainer from "../components/Blogs/PaginationContainer"
import { BlogCardSkeleton } from "../components/skeleton/BlogCardSkeleton"
import BlogCard from "../components/Blogs/BlogCard"
import BlogHeaderWrapper from "../components/Blogs/BlogHeaderWrapper"
import { PaginationAtomId } from "../hooks/PaginationAtomId"
import loadingAtom from "../store/atoms/loadingAtom"


const Following = ()=>{
  const [blogs,setBlogs] = useState<BlogsType[]>([])
  const currentPage = useRecoilValue(currentPageAtom(PaginationId.following))
  const [loading ,setLoading ] = useRecoilState(loadingAtom(PaginationId.following))
  const setPaginationDetails = useSetRecoilState<PaginationDetails>(paginationDetailsAtom(PaginationId.following))

  const [noFollowing, setNoFollowing] = useState(false)

  useEffect(()=>{
    const token = localStorage.getItem("jwt");    
    (async()=>{
      setLoading(true)
      try {       
        const res1 = await axios({
          method: "get",
          url: `${BACKEND_URL}/api/v1/social/following`,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });     
        const followingIds = res1.data.data.map((e:any)=>{
          return e.followingId
        })
        const res = await axios({
          method: "post",
          url: `${BACKEND_URL}/api/v1/social/followingBlogs`,
          data : {followingIds : followingIds, page : currentPage},
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });   
      //! do something for when no blogs
        if(res.data.details.totalBlogs===0){
          setNoFollowing(true)
          // return
        }
        setPaginationDetails(res.data.details)
        setBlogs(res.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()
  },[currentPage])


  return <section className="m-12 flex flex-col items-center h-screen">
      <div id="top"
        className="flex flex-row justify-start items-center w-full md:w-[675px] lg:w-[925px] pb-4 border-b-[1px] gap-7 text-sm">
        {/* here value is blogHome so that it takes the currentpage and loading of blogHome and not following */}
        <PaginationAtomId.Provider value={PaginationId.blogHome}>
          <BlogHeaderWrapper label={"For You"} location="/blogs"/>
          <BlogHeaderWrapper label={"Following"}/>
        </PaginationAtomId.Provider>
      </div>

      {
        noFollowing 

        ? <NoFollowing/>
        
        : <div>
          {loading 
            ? (Array(8).fill(null).map((_,index)=><BlogCardSkeleton index={index} key={index}/>)) 
            : (
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
      }


      <div className={`${noFollowing?"hidden":"mt-8 justify-self-end"}`}>
        <PaginationAtomId.Provider value={PaginationId.following}>
          <PaginationContainer/>
        </PaginationAtomId.Provider>
      </div>
  </section>

}

const NoFollowing = ()=>{
  return <div className="mt-6 flex flex-col items-center gap-4">
    <h3 className="font-semibold text-base text-gray-700">No Blogs Here</h3>
    <p className="text-sm text-gray-500">Follow Authors to see blogs here</p>
  </div>
}

export default Following