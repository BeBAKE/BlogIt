import { atom } from "recoil";
import { Drafts } from "../../components/Draft/Draft";

const draftAtom = atom<Drafts[]>({
  key : "DraftAtom",
  default  : []
})

export default draftAtom