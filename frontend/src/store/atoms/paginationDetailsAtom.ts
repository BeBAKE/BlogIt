import { atomFamily } from "recoil";

export type PaginationDetails = {
  totalBlogs : number,
  itemsPerPage : number
}

export const paginationDetailsAtom = atomFamily<PaginationDetails,string>({
  key : 'paginationDetailsAtom',
  default : {
    totalBlogs : 0,
    itemsPerPage : 0
  }
})