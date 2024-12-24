import { UIEvent, useState, useEffect } from "react";
import BlogCard from "../Blogs/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../../constants/backendURL";
import { useRecoilState, useRecoilValue } from "recoil";
import BookmarkAtom from "../../store/atoms/bookmarksAtom";
import jwtAtom from "../../store/atoms/jwtAtom";
import { toast } from "react-toastify";
import Spinner from "../../Logo/Spinner";
import NoBlogs from "./NoBlogs";

export type Bookmarks = {
  blog : {
    authorId: string; // who made the blog
    authorName: string;
    summaryTitle: string;
    summaryBody: string;
    createdAt: Date;
    image : string | null
    
  }
  id: string; // id of bookmark
  bookmarkedAt: Date;
  userId: string; // user's id who bookmarked it
  blogId: string; // blog's id
}

export type CursorInfo = {
  myCursorId : string, // last bookmarks's id
  myCursor : Date // last bookmarkedAt
}


const Bookmark = ()=>{
  const [bookmarks, setBookmarks] = useRecoilState<Bookmarks[]>(BookmarkAtom)
  const [bookmarksFinished, setBookmarksFinished] = useState(false)
  const [loading, setLoading ] = useState(true)
  const [isError , setIsError] = useState<boolean>(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const [cursorInfo, setCursorInfo] = useState<CursorInfo>()
  const [sendRequestByScrolling, setSendRequestByScrolling] = useState(true)
  const jwt = useRecoilValue(jwtAtom)

  useEffect(()=>{
    (async()=>{
      try {  
        if(jwt==="invalid") {
          toast.error("invalid token")
          throw new Error("invalid token")
        }     
        const res = await axios({
          method: "post",
          url: `${BACKEND_URL}/api/v1/blog/bookmark/bulk`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          }
        });
        const fetchedBookmark : Bookmarks[] = res.data.data
        if(fetchedBookmark.length===0) {
          setBookmarksFinished(true) // so that no req go when scrolling
          setIsEmpty(true)
          return
        }
        setBookmarks(fetchedBookmark)
        setLoading(false)
        setCursorInfo({
          myCursorId : fetchedBookmark[fetchedBookmark.length-1].id,
          myCursor : fetchedBookmark[fetchedBookmark.length-1].bookmarkedAt
        })
      } catch (error) {
        console.log(error)
        setIsError(true)
      } finally {
        setLoading(false)
      }
    })()
  },[])

  const scrolling = async(e:UIEvent<HTMLDivElement>)=>{
    if(!sendRequestByScrolling) return
    const { scrollTop, scrollHeight, clientHeight} = e.currentTarget;
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100
    );
    fetchBookmarks(position)
  }
  
  const fetchBookmarks = async(position : number)=>{
    if(position===100 && bookmarksFinished===false){
      setSendRequestByScrolling(false)
      setLoading(true)
      try { 
        if(jwt==="invalid") {
          toast.error("invalid token")
          throw new Error("invalid token")
        }
        const res = await axios({
          method: "post",
          url: `${BACKEND_URL}/api/v1/blog/bookmark/bulk`,
          data : cursorInfo,
          headers: {
            Authorization: `Bearer ${jwt}`,
          }
        })   
        const fetchedBookmark : Bookmarks[] = res.data.data
        if(fetchedBookmark.length===0) {
          setBookmarksFinished(true)
          return
        }
        setBookmarks(prev => [...prev,...fetchedBookmark])
        setCursorInfo({
          myCursorId : fetchedBookmark[fetchedBookmark.length-1].id,
          myCursor : fetchedBookmark[fetchedBookmark.length-1].bookmarkedAt
        })
        setSendRequestByScrolling(true)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="h-screen flex flex-col justify-start items-center overflow-y-scroll" onScroll={scrolling}>
      <div className="text-3xl md:text-4xl font-bold self-center mb-10 md:mb-16">
        Bookmarks
      </div>


      {
        isError
        ?
        <div className="text-2xl font-extralight h-96 w-full flex flex-row items-center justify-center">Oops! something went wrong</div>
        :
        (
          isEmpty
          ?
          <NoBlogs label={"Bookmarked Blogs will be shown here"}/>
          :
          <div>
          {
            bookmarks.map((e:Bookmarks,index:number)=>{
              const date = new Date((e.blog.createdAt)).toString().split(" ")
              return ( 
                <BlogCard
                  authorId={e.blog.authorId}
                  key={index}
                  index={index}
                  id={e.blog.authorId}//id - just to avoid error in BlogCard
                  summaryTitle={e.blog.summaryTitle}
                  summaryBody={e.blog.summaryBody}
                  date={date}
                  documentId={e.blogId}//also need in Bookmark.tsx to open that Blog
                  authorName={e.blog.authorName}
                  isBlog={false}
                  bookmarkId={e.id} // to send remove request
                  imageName={e.blog.image??undefined}
                />
              )
            })
          }
          </div>
        )
      }


      {/* Loader for cursor scrolling */}
      <div
      className={`text-xl ${!loading ? "hidden" : "flex flex-row justify-center items-center"} mt-10`}>
        <Spinner/>
      </div>

    
    </div>
  )
}
export default Bookmark;