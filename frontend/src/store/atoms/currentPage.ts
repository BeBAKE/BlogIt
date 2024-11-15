import { atom } from "recoil";

export const currentPageAtom = atom<number>({
  key : "currentPage",
  default : Number((window.location.search.split("=")[1]) ?? 1)
})