import PrevNextIcon from "./Prev_Next_Icon"
import More from "../StatusBar/More"

import { useRecoilValue } from "recoil"
import { currentPageAtom } from "../../store/atoms/currentPage";
import { maxPagesSelector } from "../../store/selector/maxPages"

import { MaxPageNumbers } from '../../constants/Pagination'

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
  const currentPage  = useRecoilValue<number>(currentPageAtom)
  const maxPage = useRecoilValue(maxPagesSelector)

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
  const currentPage = useRecoilValue(currentPageAtom)

  return (
  <a href={`/blogs?page=${pageNo}`}
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
  <More w={3} hover={false}/>
  </>
}
const PaginationNext = ()=>{
  return <div className="w-fit">
  <PrevNextIcon next={true}/>
  </div>
}



export default PaginationContainer
