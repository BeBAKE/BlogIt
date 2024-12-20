import { atomFamily } from "recoil";

const loadingAtom = atomFamily<boolean,string>({
  key : "loadingAtom",
  default : true
})

export default loadingAtom