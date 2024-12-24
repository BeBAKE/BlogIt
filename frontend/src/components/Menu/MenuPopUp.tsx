import { useRecoilState, useRecoilValue } from "recoil"
import { isMenuOpenAtom } from "../../store/atoms/isMenuOpen"
import { userNameSelector } from "../../store/selector/userName"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import jwtAtom from "../../store/atoms/jwtAtom"
import BookmarkMenuLogo from "../../Logo/BookmarkMenuLogo"
import DraftMenuLogo from "../../Logo/DraftMenuLogo"
import PublishedBlogMenuLogo from "../../Logo/PublishedBlogMenuLogo"


const MenuPopUp = ()=>{
  const [ isMenuOpen, setIsMenuOpen ] = useRecoilState(isMenuOpenAtom)

  useEffect(()=>{
    const clickHandler = (e:Event)=>{   
      const target = e.target as HTMLElement
      if(target.id!=="StatusBarProfilePic"){
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('click',clickHandler)

    return ()=>{
      window.removeEventListener('click',clickHandler)
    }
  },[])

  return (
    <div id="floating_menu" 
      className={`bg-white text-sm text-gray-500
      ${isMenuOpen ? "block" : "hidden"}
      shadow-[0px_0px_4px_1px_rgb(0,0,0,0.35)] 
      absolute right-6 top-14
      h-fit w-64 z-10`}>
        <MenuSection1 gap={"2"}/>
        <MenuSectionBreak/>
        <MenuSectionBottom/>
    </div>
  )
}

export const MenuSection1 = ({gap}:{gap : string})=>{
  const nav = useNavigate()

  const goToBookmark = useCallback(()=>{
    nav("/menu/bookmarks")
  },[])
  const goToDraft = useCallback(()=>{
    nav("/menu/drafts")
  },[])
  const goToPublishedBlogs = useCallback(()=>{
    nav("/menu/publishedBlogs")
  },[])

  return (
  <ul className={`p-5 flex flex-col gap-${gap}`}>
    <li className="flex flex-row gap-3 items-center group">
      <BookmarkMenuLogo/>
      <span className="group-hover:text-neutral-800" onClick={goToBookmark}>Bookmarks</span>
    </li>

    <li className="flex flex-row gap-3 items-center px-[3px] group">
      <DraftMenuLogo/>
      <span className="group-hover:text-neutral-800" onClick={goToDraft}>Drafts</span>
    </li>
    
    <li className="flex flex-row gap-3 items-center group">
      <PublishedBlogMenuLogo/>
      <span className="group-hover:text-neutral-800" onClick={goToPublishedBlogs}>Published Blogs</span>
    </li>
  </ul>
  )
}


export const MenuSection2 = ({gap}:{gap : string})=>{
  return (
  <ul className={`border-b-[1px] p-5 flex flex-col gap-${gap}`}>
    <li className="flex flex-row gap-3 items-center group">About Me</li>
  </ul>
  )
}


export const MenuSectionBottom = ()=>{
  const userName = useRecoilValue(userNameSelector)
  const [jwt, setJwt] = useRecoilState(jwtAtom)
  const nav = useNavigate()

  const logout = useCallback(()=>{
    localStorage.clear()
    setJwt("")
    nav('/signin',{replace : true})
    if(jwt==="invalid") {
      toast.error("invalid token")
      return
    }
    toast.success("User logged out")
  },[])

  return (
    <div className="p-5 flex flex-col group">
      <span onClick={logout}
      className="group-hover:text-neutral-800">Sign out</span>
      <span className="text-sm group-hover:text-neutral-800">{userName.toLocaleLowerCase()}</span>
    </div>
  )
}

export const MenuSectionBreak = ()=>{
  return <div
  className="h-[1px] bg-gray-200">
    
  </div>
}
export const VerticalDivider = ()=>{
  return <div
  className="w-[1px] h-screen bg-gray-200 hidden lg:block">
  </div>
}


export default MenuPopUp