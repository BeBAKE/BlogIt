import {memo} from "react"
import { useRecoilState } from "recoil"
import draftFloatingMenuAtom from "../../store/atoms/DraftFloatingMenu"
import DraftFloatingMenu from "./DraftFloatingMenu"
interface Props {
  w ?: number,
  hover ?: boolean,
  index : number ,
  id : string
}
const DraftMore = memo(({ w,hover,index,id} : Props ) => {
    
  //@ts-ignore
  const [draftFloatMenu, setDraftFloatMenu] = useRecoilState(draftFloatingMenuAtom(index))

  const onMoreClick = ()=>{
    setDraftFloatMenu(prev => !prev)
  }

  return (<div className="relative" id={`${index}`}>
    <svg
      id="moreIcon"
      viewBox="0 0 210 210"
      onClick={onMoreClick}
      className={`${w ? "w-"+w : "w-4 md:w-5" } fill-current text-neutral-500 
      ${(hover===true || hover===undefined) ? "hover:text-neutral-800" : ""}`}>
      <g id="moreIcon">
        <path id="moreIcon" d="M25,80C11.215,80,0,91.215,0,105s11.215,25,25,25c13.785,0,25-11.215,25-25S38.785,80,25,80z"/>
        <path id="moreIcon" d="M105,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S118.785,80,105,80z"/>
        <path id="moreIcon" d="M185,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S198.785,80,185,80z"/>
      </g>
    </svg>

    {
      <DraftFloatingMenu id={id} index={index}/>
    }
    
  </div>
  )
})

export default DraftMore