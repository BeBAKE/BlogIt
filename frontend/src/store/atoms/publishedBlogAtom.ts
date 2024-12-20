import { atom } from "recoil";
import { BlogsType } from "../../pages/BlogsHome";

const publishedBlogAtom = atom<BlogsType[]>({
  key : "publishedBlogAtom",
  default  : []
})

export default publishedBlogAtom