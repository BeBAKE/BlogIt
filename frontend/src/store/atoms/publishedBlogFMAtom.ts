import { atomFamily } from "recoil";

const publishedBlogFMAtom = atomFamily<boolean,number>({
  key : "publishedBlogFloatingMenuAtom",
  default : false
})

export default publishedBlogFMAtom