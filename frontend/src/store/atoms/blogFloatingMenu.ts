import { atomFamily } from "recoil";

const blogFloatingMenuAtom = atomFamily<boolean,number>({
  key : "blogFloatingMenuAtom",
  default : false
})

export default blogFloatingMenuAtom