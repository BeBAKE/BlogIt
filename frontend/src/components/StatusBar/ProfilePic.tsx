import { memo, useCallback, MouseEvent } from "react"
import { useSetRecoilState } from "recoil"
import { isMenuOpenAtom } from "../../store/atoms/isMenuOpen"

type ProfilePicProps = {authorName : string,id?:string,isUser?:boolean}

const ProfilePic = memo(({ authorName, id } : ProfilePicProps)=>{
  const setIsMenuOpen = useSetRecoilState(isMenuOpenAtom)

  const menuStatus = useCallback((e:MouseEvent<HTMLParagraphElement>)=>{
    if(e.currentTarget.id==="genericProfilePic") return
    setIsMenuOpen(prev => !prev)
  },[])

  return <>
    <p id={id?id:"genericProfilePic"}
    className="bg-black text-white rounded-[100%] min-h-8 min-w-8 max-h-8 max-w-8 flex flex-row justify-center items-center" onClick={menuStatus}>
      {authorName.split("")[0].toUpperCase()}
    </p>
  </>
})

export default ProfilePic