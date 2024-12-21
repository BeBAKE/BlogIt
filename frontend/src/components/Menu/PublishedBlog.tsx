import { UIEvent, useState, useEffect } from "react";
import BlogCard from "../Blogs/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../../constants/backendURL";
import { BlogsType } from "../../pages/BlogsHome";
import { useRecoilState, useRecoilValue } from "recoil";
import publishedBlogAtom from "../../store/atoms/publishedBlogAtom";
import jwtAtom from "../../store/atoms/jwtAtom";
import { toast } from "react-toastify";

export type CursorInfo = {
  myCursorId : string, // last created's id
  myCursor : Date // last createdAt
}

const PublishedBlog = ()=>{
  const [blogs,setBlogs] = useRecoilState<BlogsType[]>(publishedBlogAtom)
  const [blogsFinished, setBlogsFinished] = useState(false)
  const [loading, setLoading ] = useState(true)
  const [isError , setIsError] = useState<boolean>(false)

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
          url: `${BACKEND_URL}/api/v1/blog/bulk/published`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          }
        });
        const fetchedBlog : BlogsType[] = res.data.data
        if(fetchedBlog.length===0) {
          setBlogsFinished(true)
          return
        }
        setBlogs(fetchedBlog)
        setLoading(false)
        setCursorInfo({
          myCursorId : fetchedBlog[fetchedBlog.length-1].id,
          myCursor : new Date(fetchedBlog[fetchedBlog.length-1].createdAt)
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
    fetchPublishedBlog(position)
  }
  
  const fetchPublishedBlog = async(position : number)=>{
    if(position===100 && blogsFinished===false){  
      setSendRequestByScrolling(false)
      setLoading(true)
      try { 
        if(jwt==="invalid") {
          toast.error("invalid token")
          throw new Error("invalid token")
        }
        const res = await axios({
          method: "post",
          url: `${BACKEND_URL}/api/v1/blog/bulk/published`,
          data : cursorInfo,
          headers: {
            Authorization: `Bearer ${jwt}`,
          }
        })   
        const fetchedBlog : BlogsType[] = res.data.data
        
        if(fetchedBlog.length===0) {
          setBlogsFinished(true)
          return
        }
        setBlogs(prev => [...prev,...fetchedBlog])
        setCursorInfo({
          myCursorId : fetchedBlog[fetchedBlog.length-1].id,
          myCursor : new Date(fetchedBlog[fetchedBlog.length-1].createdAt)
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
    <div className="h-screen flex flex-col justify-start items-center mx-12 overflow-y-scroll" onScroll={scrolling}>
      <div className="text-4xl font-bold self-center mb-16">
        Published Blogs
      </div>

      {
        isError
        ?
        <div className="text-2xl font-extralight">
          Oops! something went wrong
        </div>
        :
        <div className="">
        {
          blogs.map((e:BlogsType,index:number)=>{
            const date = new Date((e.createdAt)).toString().split(" ")
            return ( 
              <BlogCard
                key={index}
                index={index}
                id={e.authorId}//id - just to avoid error in BlogCard
                summaryTitle={e.summaryTitle}
                summaryBody={e.summaryBody}
                date={date}
                documentId={e.id}//to open the blog & to delete that blog(in more)
                authorName={e.authorName}
                authorId={e.authorId}
                bookmarkId={undefined}//to send remove req (no need here)
                imageName={e.image??undefined}
                isBlog={false} // false so that BM icon is invisible
                type="PublishedBlog"
                />
              )
          })
        }
        </div>
      }

      {/* Loader for cursor scrolling */}
      <div
      className={`text-xl ${!loading ? "hidden" : "flex flex-row justify-center items-center"}`}>
        Loading...
      </div>

    
    </div>
  )
}
export default PublishedBlog;