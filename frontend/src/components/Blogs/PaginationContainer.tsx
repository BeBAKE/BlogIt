import PrevNextIcon from "./Prev_Next_Icon"

import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil"
import { currentPageAtom } from "../../store/atoms/currentPage";
import { maxPagesSelector } from "../../store/selector/maxPages"

import { MaxPageNumbers } from '../../constants/Pagination'
import { useContext } from "react";
import { PaginationAtomId } from "../../hooks/PaginationAtomId";
import { useNavigate } from "react-router-dom";
import loadingAtom from "../../store/atoms/loadingAtom";

// put url in the props of Test (or PaginationContianer) so that it can be used when there is a sorting
const PaginationContainer = ()=>{

  return (
      <div
      className="flex flex-row gap-12 items-center justify-between w-fit h-10 px-4 rounded-xl bg-white ">
        <PaginationPrev/>
        <PaginationContent/>
        <PaginationNext/>
      </div>
    )
}



const PaginationContent = ()=>{
  const paginationId = useContext(PaginationAtomId)
  const currentPage  = useRecoilValue<number>(currentPageAtom(paginationId))
  const maxPage = useRecoilValue(maxPagesSelector(paginationId))

  if(maxPage<=MaxPageNumbers){
    return (
      <div className="flex flex-row justify-around items-green w-full gap-4">
        {Array(maxPage).fill(null).map((_,index)=>{
          return <PaginationItem key={index} pageNo={index+1}/>
        })}
      </div>
    )
  }
  else{
    if(currentPage<=4){
      return <div className="flex flex-row justify-around items-green w-full gap-4">
        <PaginationItem pageNo={1}/>
        <PaginationItem pageNo={2}/>
        <PaginationItem pageNo={3}/>
        <PaginationItem pageNo={4}/>
        <PaginationItem pageNo={5}/>
        <PaginationEllipsis/>
        <PaginationItem pageNo={maxPage}/>
      </div>
    }

    if(currentPage>=5 && currentPage<(maxPage-(MaxPageNumbers-3))){
      return <div className="flex flex-row justify-around items-green w-full gap-4">
        <PaginationItem pageNo={1}/>
        <PaginationEllipsis/>
        <PaginationItem pageNo={(currentPage-1)}/> {/* it will change */}
        <PaginationItem pageNo={currentPage}/> {/* it will change */}
        <PaginationItem pageNo={(currentPage+1)}/> {/* it will change */}
        <PaginationEllipsis/>
        <PaginationItem pageNo={maxPage}/>
      </div>
    }
    if(currentPage>=(maxPage-(MaxPageNumbers-3))){
      return <div className="flex flex-row justify-around items-green w-full gap-4">
        <PaginationItem pageNo={1}/>
        <PaginationEllipsis/>
        <PaginationItem pageNo={(maxPage-4)}/> {/* it will change */}
        <PaginationItem pageNo={(maxPage-3)}/> {/* it will change */}
        <PaginationItem pageNo={(maxPage-2)}/> {/* it will change */}
        <PaginationItem pageNo={(maxPage-1)}/> {/* it will change */}
        <PaginationItem pageNo={maxPage}/>
      </div>
    }
  }

}


const PaginationItem = ({pageNo}:{pageNo:number})=>{
  const paginationId = useContext(PaginationAtomId)
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom(paginationId))
  const setLoading = useSetRecoilState(loadingAtom(paginationId))
  const nav = useNavigate()
  const location = paginationId==="blogHome"?`/blogs?page=${pageNo}`:`/blogs/following?page=${pageNo}`

  return (
  <a 
    onClick={()=>{
      if(pageNo===currentPage) return
      setCurrentPage(pageNo);
      setLoading(true);
      nav(location)}}
    className={`${currentPage===pageNo ? "text-white bg-gray-800":"text-black bg-white"} h-6 w-6 text-black  rounded-xl flex flex-row justify-center items-center text-xs font-light`}>
      {pageNo}
  </a>
  )
}


const PaginationPrev = ()=>{
  return <div className="w-fit">
  <PrevNextIcon next={false}/>
  </div>
}
const PaginationEllipsis = ()=>{
  return <>
  <DeadMoreIcon w={3}/>
  </>
}
const PaginationNext = ()=>{
  return <div className="w-fit">
  <PrevNextIcon next={true}/>
  </div>
}

const DeadMoreIcon = ({w}:{w:number})=>{
  return <svg
      id="moreIcon"
      viewBox="0 0 210 210"
      className={`w-${w} fill-current text-neutral-500`}>
      <g id="moreIcon">
        <path id="moreIcon" d="M25,80C11.215,80,0,91.215,0,105s11.215,25,25,25c13.785,0,25-11.215,25-25S38.785,80,25,80z"/>
        <path id="moreIcon" d="M105,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S118.785,80,105,80z"/>
        <path id="moreIcon" d="M185,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S198.785,80,185,80z"/>
      </g>
    </svg>
}



export default PaginationContainer
