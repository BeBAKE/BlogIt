import { selector } from "recoil";
import { paginationDetailsAtom } from "../atoms/paginationDetailsAtom";

export const maxPagesSelector = selector({
  key : "maxPageSelector",
  get : ({get})=>{
    const {
      totalBlogs ,
      itemsPerPage
    } = get(paginationDetailsAtom)

    if(itemsPerPage === 0 ){
      return 0
    }
    const val = Math.ceil(totalBlogs/itemsPerPage)    
    
    return val
  }
})