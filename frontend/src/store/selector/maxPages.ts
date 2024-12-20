import { selectorFamily } from "recoil";
import { paginationDetailsAtom } from "../atoms/paginationDetailsAtom";

// type MaxPage = {
//   totalBlogs : number,
//   itemsPerPage : number
// }

export const maxPagesSelector = selectorFamily({
  key : "maxPageSelector",
  get : (paginationId : string) => ({get}) => {
    const {
      totalBlogs ,
      itemsPerPage
    } = get(paginationDetailsAtom(paginationId))

    if(itemsPerPage === 0 ){
      return 0
    }
    const val = Math.ceil(totalBlogs/itemsPerPage)   
    
    return val
  }
})