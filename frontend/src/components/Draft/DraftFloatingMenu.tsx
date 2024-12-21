import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import axios from "axios"
import { BACKEND_URL } from "../../constants/backendURL"

import { toast } from "react-toastify"
import draftAtom from "../../store/atoms/DraftsAtom"
import draftFloatingMenuAtom from "../../store/atoms/DraftFloatingMenu"
import { useNavigate } from "react-router-dom"
import { Drafts } from "./Draft"
import jwtAtom from "../../store/atoms/jwtAtom"

interface DraftFloatingMenuProps {
  id : string,
  index : number
}

const DraftFloatingMenu = ({id,index}:DraftFloatingMenuProps)=>{
  const [drafts, setDrafts] = useRecoilState(draftAtom)
  const [draftFloatMenu, setDraftFloatMenu] = useRecoilState(draftFloatingMenuAtom(index))
  const jwt = useRecoilValue(jwtAtom)

  const nav = useNavigate()

  // const arrow_up = {
  //   width: "0px",
  //   height: "0px",
  //   borderLeft: "10px solid transparent",
  //   borderRight: "10px solid transparent" ,
  //   borderBottom: "10px solid"
  // }
  const one = {
    // position: 'absolute',
    width: "0px",
    height: "0px",
    borderLeft: '6 solid transparent',
    borderRight: '6 solid transparent',
    borderBottom: '14px solid rgba(0, 0, 0, 0.35)',
    filter: 'blur(3px)',
    transform: 'translate(0px, 1px)',
  };

  const two = {
    // position: 'absolute',
    width: "0px",
    height: "0px",
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '10px solid white',
  };

  useEffect(()=>{
    if(!draftFloatMenu) return 
    const clickHandler = (e:Event)=>{
      const target = e.target as HTMLElement   
      if(target.id!=="moreIcon"){
        setDraftFloatMenu(false)
      }
    }
    window.addEventListener('click',clickHandler)

    return ()=>{
      window.removeEventListener('click',clickHandler)
    }
  },[draftFloatMenu])

  const onRemoveDraft = async(e:React.UIEvent<HTMLParagraphElement>)=>{    
    
    try {
      if(jwt==="invalid") {
        toast.error("invalid token")
        throw new Error("invalid token")
      }

      //@ts-ignore
      const newDrafts = drafts.filter((bm,index)=>{
        return index.toString() !== e.currentTarget.id
      })  as Drafts[]
      setDrafts(newDrafts)
      toast.success("drafted removed")
      
      await axios({
        url : `${BACKEND_URL}/api/v1/draft/${id}`,
        method : 'delete',
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div 
    id="DraftFloatingMenu"
    className={`${draftFloatMenu ? "visible":"invisible"} w-40 h-20 absolute top-6 right-[-4.375rem] z-10 flex flex-col items-center gap-0 justify-center`}>

      {/* top arrow */}
      <div style={one} className="relative"></div>
      <div style={{ ...two, top: 4}} className="absolute"></div>

      {/* real body */}
      <div 
      className={`flex flex-col gap-2 bg-[rgb(255,255,255)] w-40 h-40 shadow-[0px_0px_4px_1px_rgb(0,0,0,0.35)]  rounded-sm p-4 text-sm text-neutral-500`}>

        <p id={`${index}`} className="text-green-900"
        onClick={()=>nav(`/blogs/create/${id}`)}>Edit Draft</p>

        <p id={`${index}`} className="text-red-500"
        onClick={onRemoveDraft}>Remove Draft</p>

      </div>
      
    </div>
  )
}

export default DraftFloatingMenu