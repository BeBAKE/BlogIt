import { atomFamily } from "recoil";

export const currentPageAtom = atomFamily<number,string>({
  key : "currentPage",
  default : Number((window.location.search.split("=")[1]) ?? 1)
})