import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { Bookmarks } from "./Bookmark"
import BookmarkAtom from "../../store/atoms/bookmarksAtom"
import axios from "axios"
import { BACKEND_URL } from "../../constants/backendURL"
import bookmarkFloatingMenuAtom from "../../store/atoms/bookmarkFloatingMenu"
import { toast } from "react-toastify"
import jwtAtom from "../../store/atoms/jwtAtom"

interface BookmarkFloatingMenu {
  bookmarkId : string,
  index : number
}

const BookmarkFloatingMenu = ({bookmarkId,index}:BookmarkFloatingMenu)=>{
  const [bookmarks, setBookmarks] = useRecoilState(BookmarkAtom)
  const [bookmarkFloatMenu, setBookmarkFloatMenu] = useRecoilState(bookmarkFloatingMenuAtom(index))
  const jwt = useRecoilValue(jwtAtom)

  // const arrow_up = {
  //   width: "0px",
  //   height: "0px",
  //   borderLeft: "10px solid transparent",
  //   borderRight: "10px solid transparent" ,
  //   borderBottom: "10px solid"
  // }
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
    if(!bookmarkFloatMenu) return 

    const clickHandler = (e:Event)=>{
      const target = e.target as HTMLElement   
      if(target.id!=="moreIcon"){
        setBookmarkFloatMenu(false)
      }
    }
    window.addEventListener('click',clickHandler)

    return ()=>{
      window.removeEventListener('click',clickHandler)
    }
  },[bookmarkFloatMenu])

  const onRemoveBookmark = async(e:React.UIEvent<HTMLParagraphElement>)=>{    
    try {
      if(jwt==="invalid") {
        toast.error("invalid token")
        throw new Error("invalid token")
      }

      //@ts-ignore
      const newBookmarks  = bookmarks.filter((bm,index)=>{
        return index.toString() !== e.currentTarget.id
      }) as Bookmarks[]
      setBookmarks(newBookmarks)
      toast.success("bookmarked removed")

      await axios({
        url : `${BACKEND_URL}/api/v1/blog/bookmark/${bookmarkId}`,
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
    className={`${bookmarkFloatMenu ? "visible":"invisible"} w-40 h-20 absolute top-6 right-[-4.375rem] z-10 flex flex-col items-center gap-0 justify-center`}>

      {/* top arrow */}
      <div style={one} className="relative"></div>
      <div style={{ ...two, top: 4}} className="absolute"></div>

      {/* real body */}
      <div 
      className={`bg-[rgb(255,255,255)] w-40 h-40 shadow-[0px_0px_4px_1px_rgb(0,0,0,0.35)]  rounded-sm p-4 text-sm text-neutral-500`}>
        <p id={`${index}`}
        className="text-red-500"
        onClick={onRemoveBookmark}>
          Remove Bookmark
        </p>
      </div>
      
    </div>
  )
}

export default BookmarkFloatingMenu