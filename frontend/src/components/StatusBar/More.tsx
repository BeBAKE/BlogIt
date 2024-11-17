import {memo} from "react"
import BookmarkFloatingMenu from "../Menu/BookmarkFloatingMenu"
import BlogFloatingMenu from "../Menu/BlogFloatingMenu"
import { useRecoilState } from "recoil"
import bookmarkFloatingMenuAtom from "../../store/atoms/bookmarkFloatingMenu"
import blogFloatingMenuAtom from "../../store/atoms/blogFloatingMenu"
interface Props {
  w ?: number,
  hover ?: boolean,
  index : number ,
  isBlog ?: boolean,
  documentId : string
}
const More = memo((
  {
    w,
    hover,
    index,
    isBlog,
    documentId // used by BmFm.tsx to send bkend remove req
  } : Props ) => {
    
  //@ts-ignore
  const [bookmarkFloatMenu, setBookmarkFloatMenu] = useRecoilState(bookmarkFloatingMenuAtom(index))
  //@ts-ignore
  const [blogFloatMenu, setBlogFloatMenu] = useRecoilState(blogFloatingMenuAtom(index))

  const onMoreClickForBookmark = ()=>{
    setBookmarkFloatMenu(prev => !prev)
    console.log("onMoreClickFor Bookmark")
  }
  const onMoreClickForBlog = ()=>{
    setBlogFloatMenu(prev => !prev)
    console.log("onMoreClickFor Blog")
  }
  return (<div className="relative" id={`${index}`}>
    <svg
      id="moreIcon"
      viewBox="0 0 210 210"
      onClick={isBlog?onMoreClickForBlog:onMoreClickForBookmark}
      className={`${w ? "w-"+w : "w-5" } fill-current text-neutral-500 
      ${(hover===true || hover===undefined) ? "hover:text-neutral-800" : ""}`}>
      <g id="moreIcon">
        <path id="moreIcon" d="M25,80C11.215,80,0,91.215,0,105s11.215,25,25,25c13.785,0,25-11.215,25-25S38.785,80,25,80z"/>
        <path id="moreIcon" d="M105,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S118.785,80,105,80z"/>
        <path id="moreIcon" d="M185,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S198.785,80,185,80z"/>
      </g>
    </svg>

    {
      isBlog 
      ? <BlogFloatingMenu/>
      : <BookmarkFloatingMenu bookmarkId={documentId} index={index}/>
    }
    
  </div>
  )
})

export default More