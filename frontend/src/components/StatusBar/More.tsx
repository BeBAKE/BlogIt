import { memo } from "react"
import { useRecoilState } from "recoil"

import BlogFloatingMenu from "../Menu/BlogFloatingMenu"
import PublishedBlogFloatingMenu from "../Menu/PublishedBlogFloatingMenu"
import BookmarkFloatingMenu from "../Menu/BookmarkFloatingMenu"

import blogFloatingMenuAtom from "../../store/atoms/blogFloatingMenu"
import publishBlogFMAtom from "../../store/atoms/publishedBlogFMAtom"
import bookmarkFloatingMenuAtom from "../../store/atoms/bookmarkFloatingMenu"

interface Props {
  w ?: number,
  hover ?: boolean,
  index : number ,
  isBlog ?: boolean,
  documentId : string,
  type ?: "PublishedBlog" | "Blog" | "Bookmark",
  imageName ?: string
  authorId : string
}
/*
documentId - 
  1. blog's id - in case of BlogHome.tsx or PublishedBlog.tsx
  (BlogHome - to follow or unfollow the author)
  (publishedBlog - to send delete blog request)
  2. bookmark's id - in case of Bookmark.tsx ( used by BmFm.tsx to send bkend remove req)
*/
const More = memo((
  {
    w,
    hover,
    index,
    isBlog,
    documentId,
    type,
    imageName,
    authorId
  } : Props ) => {
    
  // @ts-ignore
  const [bookmarkFloatMenu, setBookmarkFloatMenu] = useRecoilState(bookmarkFloatingMenuAtom(index))
  //@ts-ignore
  const [blogFloatMenu, setBlogFloatMenu] = useRecoilState(blogFloatingMenuAtom(index))
  //@ts-ignore
  const [pBFloatingMenu, setPBFloatingMenu] = useRecoilState(publishBlogFMAtom(index))

  const onMoreClickForBookmark = ()=>{
    setBookmarkFloatMenu(prev => !prev)
    // console.log("onMoreClickFor Bookmark")
  }
  const onMoreClickForBlog = ()=>{
    setBlogFloatMenu(prev => !prev)
    // console.log("onMoreClickFor Blog")
  }
  const onMoreClickForPublishedBlog = ()=>{
    setPBFloatingMenu(prev => !prev)
    // console.log("onMoreClickFor PublishedBlog")
  }

  return (<div className="relative" id={`${index}`}>
    <svg
      id="moreIcon"
      viewBox="0 0 210 210"
      onClick={type==="PublishedBlog"
        ? onMoreClickForPublishedBlog 
        : (isBlog ? onMoreClickForBlog : onMoreClickForBookmark) }
      className={`${w ? "w-"+w : "w-4 md:w-5" } fill-current text-neutral-500 
      ${(hover===true || hover===undefined) ? "hover:text-neutral-800" : ""}`}>
      <g id="moreIcon">
        <path id="moreIcon" d="M25,80C11.215,80,0,91.215,0,105s11.215,25,25,25c13.785,0,25-11.215,25-25S38.785,80,25,80z"/>
        <path id="moreIcon" d="M105,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S118.785,80,105,80z"/>
        <path id="moreIcon" d="M185,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S198.785,80,185,80z"/>
      </g>
    </svg>

    {
      type==="PublishedBlog"
      ? <PublishedBlogFloatingMenu blogId={documentId} index={index} imageName={imageName}/>
      : (isBlog 
        ? <BlogFloatingMenu authorId={authorId} index={index}/>
        : <BookmarkFloatingMenu bookmarkId={documentId} index={index}/>
        )
    }
    
  </div>
  )
})

export default More