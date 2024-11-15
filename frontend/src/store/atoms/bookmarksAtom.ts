import { atom } from "recoil";
import { Bookmarks } from "../../components/Menu/Bookmark";

const BookmarkAtom = atom<Bookmarks[]>({
  key : "BookmarkAtom",
  default  : []
})

export default BookmarkAtom