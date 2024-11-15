import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import ProfilePic from "../components/StatusBar/ProfilePic"
import { BACKEND_URL } from "../constants/backendURL"
import axios from "axios"
import BlogSkeleton from "../components/skeleton/BlogSkeleton"
import ReadOnlyEditor from "../components/Blogs/ReadOnlyEditor"

type BlogDetailType = {
  id : string,
  title : string,
  body : string,
  createdAt : string[],
  authorName : string,
  owner ?: boolean,
}


const BlogPage = () => {
  const {id} = useParams()
  const [blogDetail , setBlogDetail ] = useState<BlogDetailType>({
    id : "",
    title : "",
    body : "",
    createdAt : ['nill',"Jan","1","1900"],
    authorName : "N/A",
    owner : false
  })

  const [ loading, setLoading ] = useState<boolean>(true)

  useEffect(()=>{
    (async()=>{
      try {
        const res = await axios({
          method : "get",
          url : `${BACKEND_URL}/api/v1/blog/post/${id}`,
          headers : {
            Authorization : `Bearer ${localStorage.getItem("jwt")}`
          }
        })  

        const parsedData = res.data.data
        const title = JSON.stringify(parsedData.title)
        const body = JSON.stringify(parsedData.body)

        const createdAt = new Date(parsedData.createdAt).toString().split(" ")//['Sun', 'Oct', '20', '2024', '21:34:00', 'GMT+0530', '(India','Standard', 'Time)']
        setBlogDetail({
          ...parsedData,
          body : body,
          title : title,
          createdAt : createdAt
        })

        setLoading(false)
      } catch (error) {
        console.log("error : ",error)
      }
    })()
  },[])

  return <>
    { 
    loading ? ( <BlogSkeleton/> ) : (<section
      className="flex flex-col md:flex-row ms-24 mt-16 me-8 gap-8 h-full justify-evenly mb-10">

      <div className="flex flex-col gap-4 max-w-[350px] md:max-w-[450px]  lg:max-w-[682px] 2xl:max-w-[890px]">
        {/* 2xl:max-w-[890px] */}
        <div>
          <ReadOnlyEditor content={blogDetail.title} id="title"/>
        </div>
        <h3 className="text-base text-neutral-500 mb-3">
          {`Posted on ${blogDetail.createdAt[1]} ${blogDetail.createdAt[2]}, ${blogDetail.createdAt[3]}`}
        </h3>


        <div
        // className="text-lg text-neutral-700 leading-8"
        className="font-charter text-[rgb(41,41,41)] text-[7.29rem] leading-[34px] break-words text-wrap tracking-wide">
          <ReadOnlyEditor content={blogDetail.body} id="body"/>
        </div>
      </div>

      <div
        className="min-w-[100px] border-none">
        <h4
        className="text-neutral-600 text-lg mb-4">Author</h4>
        <div className="flex flex-row gap-4">
          <ProfilePic authorName={blogDetail.authorName}/>
          <p className="text-3xl font-bold">
            {blogDetail.authorName}
          </p>
        </div>
      </div>
    </section>)
    }
    </>
}

export default BlogPage


//! this is to show blogs (BlogPage.tsx)