import { memo, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { PaginationAtomId } from "../../hooks/PaginationAtomId"
import { currentPageAtom } from "../../store/atoms/currentPage"
import loadingAtom from "../../store/atoms/loadingAtom"

type BlogHeaderWrapper = { 
  label : string,
  location ?: string
}

const BlogHeaderWrapper = memo(({label,location}:BlogHeaderWrapper)=>{
  const paginationId = useContext(PaginationAtomId)
  const currentPage = useRecoilValue(currentPageAtom(paginationId))
  const setLoading = useSetRecoilState(loadingAtom(paginationId))
  const { pathname } = useLocation()

  const nav = useNavigate()
  const clickHandler = ()=>{
    if(location) {
      setLoading(true)
      nav(`${location}?page=${currentPage}`)
    }
  }
  return (
  <p 
    onClick={clickHandler}
    className={`
      ${label==="For You"&&pathname==='/blogs' 
        ? "text-neutral-800 font-semibold" 
        : "text-neutral-500 hover:text-neutral-800"}
      ${label==="Following"&&pathname==='/blogs/following' 
        ? "text-neutral-800 font-semibold" 
        : "text-neutral-500 hover:text-neutral-800"}`}>
    {label}
  </p>
  )
})

export default BlogHeaderWrapper