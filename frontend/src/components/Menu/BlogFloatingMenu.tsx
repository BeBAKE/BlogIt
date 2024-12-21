import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import axios from "axios"
import { BACKEND_URL } from "../../constants/backendURL"
import { toast } from "react-toastify"
import blogFloatingMenuAtom from "../../store/atoms/blogFloatingMenu"
import { useLocation } from "react-router-dom"
import jwtAtom from "../../store/atoms/jwtAtom"

interface BlogFloatingMenu {
  authorId : string,
  index : number,
}


const BlogFloatingMenu = ({authorId,index}:BlogFloatingMenu)=>{
  const [blogFloatingMenu, setBlogFloatingMenu] = useRecoilState(blogFloatingMenuAtom(index))
  const jwt = useRecoilValue(jwtAtom)

  const { pathname } = useLocation()

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
    if(!blogFloatingMenu) return 

    const clickHandler = (e:Event)=>{
      const target = e.target as HTMLElement   
      if(target.id!=="moreIcon"){
        setBlogFloatingMenu(false)
      }
    }
    window.addEventListener('click',clickHandler)

    return ()=>{
      window.removeEventListener('click',clickHandler)
    }
  },[blogFloatingMenu])

  const onFollow = async()=>{
    try {
      if(jwt==="invalid") {
        toast.error("invalid token")
        throw new Error("invalid token")
      }
      await axios({
        url : `${BACKEND_URL}/api/v1/social/following`,
        method : 'post',
        data : {followingId : authorId},
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      })
      toast.success("Author followed")
    } catch (error:any) {
      if(error?.response.data.message) toast.error("Author already followed")
      console.log(error)
    }
  }

  const onUnfollow = async()=>{    
    try {
      if(jwt==="invalid") {
        toast.error("invalid token")
        throw new Error("invalid token")
      }
      await axios({
        url : `${BACKEND_URL}/api/v1/social/following`,
        method : 'delete',
        data : {followingId : authorId},
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      })
      toast.success("Author Unfollowed")
    } catch (error:any) {
      if(error?.response.data.message) toast.error("Author already unfollowed")
      console.log(error)
    }
  }


// right = -[(half of div - half of more)]px - to center the pop up menu
  return (
    <div 
    id="BmFloatingMenu"
    className={`${blogFloatingMenu ? "visible":"invisible"} w-40 h-20 absolute top-6 right-[-4.375rem] z-10 flex flex-col items-center gap-0 justify-center`}>

      {/* top arrow */}
      <div style={one} className="relative"></div>
      <div style={{ ...two, top: 4}} className="absolute"></div>

      {/* real body */}
      <div 
      className={`bg-[rgb(255,255,255)] w-40 h-40 shadow-[0px_0px_4px_1px_rgb(0,0,0,0.35)]  rounded-sm p-4 text-sm text-neutral-500 flex flex-col justify-center items-center`}>
        <p id={`${index}`} 
          className={`${pathname==="/blogs/following"?"hidden":"text-green-700"} mb-2`} 
          onClick={onFollow}>
            Follow Author
        </p>

        <p id={`${index}`} className="text-red-500" onClick={onUnfollow}>
          Unfollow Author
        </p>
      </div>
      
    </div>
  )
}

export default BlogFloatingMenu




