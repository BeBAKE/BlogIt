import { atomFamily } from "recoil";

const draftFloatingMenuAtom = atomFamily<boolean,number>({
  key : "draftFloatingMenuAtom",
  default : false
})

export default draftFloatingMenuAtom