import { memo, useCallback, MouseEvent } from "react"
import { useSetRecoilState } from "recoil"
import { isMenuOpenAtom } from "../../store/atoms/isMenuOpen"


const ProfilePic = memo(({authorName,id}:{authorName : string,id?:string,isUser?:boolean})=>{
  const setIsMenuOpen = useSetRecoilState(isMenuOpenAtom)
  const menuStatus = useCallback((e:MouseEvent<HTMLParagraphElement>)=>{
    if(e.currentTarget.id==="genericProfilePic") return
    setIsMenuOpen(prev => !prev)
  },[])

  return <>
  {/* here image of user will be stored or the initial of user's Name */}
  <p id={id?id:"genericProfilePic"}
  className="bg-black text-white rounded-[100%] min-h-8 min-w-8 max-h-8 max-w-8 flex flex-row justify-center items-center" onClick={menuStatus}>
    {/* {authorName}   */}
    {authorName.split("")[0].toUpperCase()}
  </p>
  </>
})

export default ProfilePic