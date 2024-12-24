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
    className="bg-black text-white rounded-[100%] h-7 w-7 md:h-8 md:w-8 flex flex-row justify-center items-center text-xs md:text-base" onClick={menuStatus}>
      {authorName.split("")[0].toUpperCase()}
    </p>
  </>
})

export default ProfilePic