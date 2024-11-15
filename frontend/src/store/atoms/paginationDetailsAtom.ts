import { atom } from "recoil";

export type PaginationDetails = {
  totalBlogs : number,
  itemsPerPage : number
}

export const paginationDetailsAtom = atom<PaginationDetails>({
  key : 'paginationDetailsAtom',
  default : {
    totalBlogs : 0,
    itemsPerPage : 0
  }
})