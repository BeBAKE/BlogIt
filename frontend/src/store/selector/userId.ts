import { selector } from "recoil";

export const userIdSelector = selector({
  key : 'userIdSelector',
  get : ({})=>{
    return localStorage.getItem("userId") ?? "N/A"
  }
})
