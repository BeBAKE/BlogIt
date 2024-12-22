import { selector } from "recoil";

export const userNameSelector = selector({
  key : 'userNameSelector',
  get : ({})=>{
    return localStorage.getItem("userName") ?? "-"
  }
})

