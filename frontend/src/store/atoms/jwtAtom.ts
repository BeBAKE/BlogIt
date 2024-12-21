import { atom } from "recoil";

const jwtAtom = atom({
  key : "jwtSelector",
  default : localStorage.getItem("jwt") ?? 'invalid'
})

export default jwtAtom