import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import ProfilePic from "../components/StatusBar/ProfilePic"
import { BACKEND_URL, S3_URL } from "../constants/backendURL"
import axios from "axios"
import BlogSkeleton from "../components/skeleton/BlogSkeleton"
import ReadOnlyEditor from "../components/Blogs/ReadOnlyEditor"
import { useRecoilValue } from "recoil"
import jwtAtom from "../store/atoms/jwtAtom"
import { toast } from "react-toastify"

type BlogDetailType = {
  id : string,
  title : string,
  body : string,
  createdAt : string[],
  authorName : string,
  owner ?: boolean,
  image : string | null // backend - image , frontend - imageName (both are image url , just differently name in back and front)
}


const BlogPage = () => {
  const {id} = useParams()
  const [blogDetail , setBlogDetail ] = useState<BlogDetailType>({
    id : "",
    title : "",
    body : "",
    createdAt : ['nill',"Jan","1","1900"],
    authorName : "N/A",
    owner : false,
    image : null
  })

  const [isError , setIsError] = useState(false)
  const [ loading, setLoading ] = useState<boolean>(true)
  const [ signedImage, setSignedImage ] = useState(undefined)
  const jwt = useRecoilValue(jwtAtom)

  useEffect(()=>{
    (async()=>{
      try {
        if(jwt==="invalid") {
          toast.error("invalid token")
          throw new Error("invalid token")
        }

        const res = await axios({
          method : "get",
          url : `${BACKEND_URL}/api/v1/blog/post/${id}`,
          headers : {
            Authorization : `Bearer ${jwt}`
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
      } catch (error) {
        setIsError(true)
        console.log("error : ",error)
      } finally {
        setLoading(false)
      }
    })()
  },[])

  useEffect(()=>{ 
    if(!blogDetail.image || jwt==='invalid') return
    (async()=>{
      try {
        const res2 = await axios(`${S3_URL}/imageUrl/${blogDetail.image}`,{
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
  },[blogDetail])

  return <>

    {
      isError
      ?
      <div className="text-2xl font-extralight h-96 w-full flex flex-row items-center justify-center">
        Oops! something went wrong
      </div>
      :
      loading 
        ? 
        ( <BlogSkeleton/> ) 
        : 
        (
      <section
        className="flex flex-col md:flex-row ms-6 mt-8 me-6 md:ms-16 lg:ms-24 md:mt-16 md:me-8 gap-8 h-full justify-evenly mb-10">

        <div className="flex flex-col gap-4 w-full sm-w-1/2 md:w-[450px]  lg:w-[682px] 2xl:w-[890px] md:items-start">{/* 2xl:max-w-[890px] */}
          <div>
            <ReadOnlyEditor content={blogDetail.title} id="title"/>
          </div>

          <h3 className="text-base text-neutral-500 mb-3 ms-3.5">
            {`Posted on ${blogDetail.createdAt[1]} ${blogDetail.createdAt[2]}, ${blogDetail.createdAt[3]}`}
          </h3>


          <img className={`h-40 w-56 md:h-64 md:w-80 object-fill self-center my-6 ${signedImage?"block":"hidden"} `}
          src={signedImage} alt="Blog's Image"/>

          <div
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