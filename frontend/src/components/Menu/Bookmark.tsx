import { UIEvent, useState, useEffect } from "react";
import BlogCard from "../Blogs/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../../constants/backendURL";
import { useRecoilState } from "recoil";
import BookmarkAtom from "../../store/atoms/bookmarksAtom";

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
  const [cursorInfo, setCursorInfo] = useState<CursorInfo>()
  const [sendRequestByScrolling, setSendRequestByScrolling] = useState(true)

  useEffect(()=>{
    const token = localStorage.getItem("jwt");    
    (async()=>{
      try {       
        const res = await axios({
          method: "post",
          url: `${BACKEND_URL}/api/v1/blog/bookmark/bulk`,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const fetchedBookmark : Bookmarks[] = res.data.data
        if(fetchedBookmark.length===0) {
          setBookmarksFinished(true)
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
      const token = localStorage.getItem("jwt");  
      setSendRequestByScrolling(false)
      setLoading(true)
      try { 
        const res = await axios({
          method: "post",
          url: `${BACKEND_URL}/api/v1/blog/bookmark/bulk`,
          data : cursorInfo,
          headers: {
            Authorization: `Bearer ${token}`,
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
    <div className="w-full h-screen flex flex-col justify-start items-center mx-12 overflow-y-scroll" onScroll={scrolling}>
      <div className="text-4xl font-bold self-center mb-16">
        Bookmarks
      </div>

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

      {/* Loader for cursor scrolling */}
      <div
      className={`text-xl ${!loading ? "hidden" : "flex flex-row justify-center items-center"}`}>
        Loading...
      </div>

    
    </div>
  )
}
export default Bookmark;