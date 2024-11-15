import { atomFamily } from "recoil";

const bookmarkFloatingMenuAtom = atomFamily<boolean,number>({
  key : "bookmarkFloatingMenuAtom",
  default : false
})

export default bookmarkFloatingMenuAtom