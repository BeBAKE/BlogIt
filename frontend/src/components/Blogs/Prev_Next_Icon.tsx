import { useCallback } from "react"
import { useRecoilValue } from "recoil"
import { currentPageAtom } from "../../store/atoms/currentPage"
import { maxPagesSelector } from "../../store/selector/maxPages"
import { paginationDetailsAtom } from "../../store/atoms/paginationDetailsAtom"
paginationDetailsAtom

const PrevNextIcon = ({next}:{next:boolean})=>{
	const currentPage = useRecoilValue(currentPageAtom)
	const maxPage = useRecoilValue(maxPagesSelector)

	const click = useCallback(()=>{
		if(next && currentPage<maxPage){
			return `/blogs?page=${currentPage+1}`
			// setCurrentPage(currentPage+1)
		}
		if(!next && currentPage!==1){		
			// setCurrentPage(currentPage-1)
			return `/blogs?page=${currentPage-1}`
		}
	},[currentPage,maxPage])

  return (
		<a href={click()}>
			<svg 
				className="fill-current text-black h-6 w-6"
				version="1.1" id="Layer_1"
				viewBox="0 0 489.6 489.6"
				transform={next ? "scale(-1,1)" : ""}>
				
				<g>
					<g>
						<path d="M244.8,489.6c135,0,244.8-109.8,244.8-244.8S379.8,0,244.8,0S0,109.8,0,244.8
							S109.8,489.6,244.8,489.6z M244.8,19.8c124.1,0,225,100.9,225,225s-100.9,225-225,225s-225-100.9-225-225S120.7,19.8,244.8,19.8z"
							/>
						<path d="M265.5,326.1c1.9,1.9,4.5,2.9,7,2.9s5.1-1,7-2.9c3.9-3.9,3.9-10.1,0-14l-67.3-67.3l67.3-67.3
							c3.9-3.9,3.9-10.1,0-14s-10.1-3.9-14,0l-74.3,74.3c-3.9,3.9-3.9,10.1,0,14L265.5,326.1z"/>
					</g>
				</g>
			</svg>
		</a>
  )
}

export default PrevNextIcon