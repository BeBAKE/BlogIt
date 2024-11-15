import { useRecoilState, useRecoilValue } from "recoil"
import { isMenuOpenAtom } from "../../store/atoms/isMenuOpen"
import { userNameSelector } from "../../store/selector/userName"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


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
      h-fit w-64`}>
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
  return (
  <ul className={`p-5 flex flex-col gap-${gap}`}>
    <li className="flex flex-row gap-3 items-center group">
      <svg 
        className="h-4 fill-current group-hover:text-neutral-800"
        xmlns="http://www.w3.org/2000/svg"  
        viewBox="0 0 50 50"><path d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z"/>
      </svg>
      <span className="group-hover:text-neutral-800" onClick={goToBookmark}>Bookmarks</span>
    </li>
    <li className="flex flex-row gap-3 items-center p-0.5 group">
    <svg 
      className="h-4 w-3 fill-current group-hover:text-neutral-800"viewBox="0 0 24 24" ><g id="_01_align_center" data-name="01 align center"><path d="M5,19H9.414L23.057,5.357a3.125,3.125,0,0,0,0-4.414,3.194,3.194,0,0,0-4.414,0L5,14.586Zm2-3.586L20.057,2.357a1.148,1.148,0,0,1,1.586,0,1.123,1.123,0,0,1,0,1.586L8.586,17H7Z"/><path d="M23.621,7.622,22,9.243V16H16v6H2V3A1,1,0,0,1,3,2H14.758L16.379.379A5.013,5.013,0,0,1,16.84,0H3A3,3,0,0,0,0,3V24H18.414L24,18.414V7.161A5.15,5.15,0,0,1,23.621,7.622ZM18,21.586V18h3.586Z"/></g></svg>
      <span className="group-hover:text-neutral-800" onClick={goToDraft}>Drafts</span>
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
  const nav = useNavigate()
  const logout = useCallback(()=>{
    if(!localStorage.getItem("jwt")) return
    localStorage.clear()
    nav('/signin',{replace : true})
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
  className="w-[1px] h-screen bg-gray-200">
  </div>
}


export default MenuPopUp