import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import axios from "axios"
import { BACKEND_URL, S3_URL } from "../../constants/backendURL"
import { toast } from "react-toastify"
// import { BlogsType } from "../../pages/BlogsHome"
import publishedBlogAtom from "../../store/atoms/publishedBlogAtom"
import publishedBlogFMAtom from "../../store/atoms/publishedBlogFMAtom"
import jwtAtom from "../../store/atoms/jwtAtom"

interface PBFloatingMenu {
  blogId : string,
  index : number,
  imageName ?: string
}

const PublishedBlogFloatingMenu = ({blogId,index,imageName}:PBFloatingMenu)=>{
  const [blogs,setBlogs] = useRecoilState(publishedBlogAtom)
  const [pBFloatingMenu, setPBFloatingMenu] = useRecoilState(publishedBlogFMAtom(index))

  const jwt = useRecoilValue(jwtAtom)

  const one = {
    // position: 'absolute',
    width: "0px",
    height: "0px",
    borderLeft: '6 solid transparent',
    borderRight: '6 solid transparent',
    borderBottom: '14px solid rgba(0, 0, 0, 0.35)',
    filter: 'blur(3px)',
    transform: 'translate(0px, 1px)',
  };

  const two = {
    // position: 'absolute',
    width: "0px",
    height: "0px",
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '10px solid white',
  };

  useEffect(()=>{
    if(!pBFloatingMenu) return 

    const clickHandler = (e:Event)=>{
      const target = e.target as HTMLElement   
      if(target.id!=="moreIcon"){
        setPBFloatingMenu(false)
      }
    }
    window.addEventListener('click',clickHandler)

    return ()=>{
      window.removeEventListener('click',clickHandler)
    }
  },[pBFloatingMenu])

  const onDeleteBlog = async(e:React.UIEvent<HTMLParagraphElement>)=>{    
    try {
      if(jwt==="invalid") {
        toast.error("invalid token")
        throw new Error("invalid token")
      }
      
      //@ts-ignore
      const newBlogs = blogs.filter((bm,index)=>{
        return index.toString() !== e.currentTarget.id
      })
      setBlogs(newBlogs)
      toast.success("Blog Deleted")
      
      await axios({
        url : `${BACKEND_URL}/api/v1/blog/${blogId}`,
        method : 'delete',
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      })
      await axios(`${S3_URL}/${imageName}`,{
        method : 'delete',
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      })
    } catch (error) {
      console.log(error)
    }
  }


// right = -[(half of div - half of more)]px - to center the pop up menu
  return (
    <div 
    id="BmFloatingMenu"
    className={`${pBFloatingMenu ? "visible":"invisible"} w-40 h-20 absolute top-6 right-[-4.375rem] z-10 flex flex-col items-center gap-0 justify-center`}>

      {/* top arrow */}
      <div style={one} className="relative"></div>
      <div style={{ ...two, top: 4}} className="absolute"></div>

      {/* real body */}
      <div 
      className={`bg-[rgb(255,255,255)] w-40 h-40 shadow-[0px_0px_4px_1px_rgb(0,0,0,0.35)]  rounded-sm p-4 text-sm text-neutral-500 flex flex-col justify-center items-center`}>
        <p id={`${index}`}
        className="text-red-500"
        onClick={onDeleteBlog}>
          Delete Blog
        </p>
      </div>
      
    </div>
  )
}

export default PublishedBlogFloatingMenu