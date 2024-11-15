import { atom } from "recoil";

export const publishBtnStatusAtom = atom<boolean>({
  key : 'publishBtnStatusAtom',
  default : false
})

