import { memo, useMemo } from "react"
import Logo from "./Logo"
import WriteLogo from "./WriteLogo"
import ProfilePic from "./ProfilePic"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue } from "recoil"
import { userNameSelector } from "../../store/selector/userName"
import Menu from "../Menu/MenuPopUp"


const StatusBar = memo(()=>{
  const userName = useRecoilValue(userNameSelector)

  const searchIcon = useMemo(()=>{
    return {
      background: `url('/search.svg') no-repeat left`,
      backgroundSize : "18px 18px",
      backgroundColor : "rgb(243 244 246)",
      borderLeft : "12px solid rgb(243 244 246)",
    }
  },[])
  const nav = useNavigate()
  const onClickWrite = ()=>{
    const newBlogId = uuidv4()
    nav(`/blogs/create/${newBlogId}`)
  }
  
  return (
    <>
    
      <section
        className="flex flex-row justify-between mx-6 py-2 px-2 border-b-[1px] border-gray-200">
        <div 
          className="flex flex-row items-center gap-4">
          <Logo/>
          <input 
            placeholder="Search"
            className="rounded-3xl h-10 p-4 ps-8 text-sm outline-none"
            style={searchIcon}
          />
        </div>

        <div className="flex flex-row items-center gap-7">
          
          <div className="flex flex-row items-center group gap-1.5"
            onClick={onClickWrite}>
            <WriteLogo/>
            <p className="text-sm font-normal text-neutral-500 group-hover:text-neutral-800">Write</p>
          </div>
          
          {/* Bell svg */}
          <svg
            className="fill-current text-neutral-500 hover:text-neutral-800 h-5 w-5"
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.6021 2C8.50812 2 6 4.50812 6 7.60205V11.764C6 13.6197 5.09391 15.3585 3.5729 16.4217L2.80234 16.9603C2.29953 17.3117 2 17.8865 2 18.5C2 18.7761 2.22386 19 2.5 19H21.5C21.7761 19 22 18.7761 22 18.5C22 17.8765 21.7023 17.2905 21.1989 16.9228L20.4102 16.3467C18.8955 15.2404 18 13.4774 18 11.6017V7.53918C18 4.47998 15.52 2 12.4608 2H11.6021ZM12.5 24C10.7368 24 9.27806 22.6961 9.03544 21H2.5C1.11929 21 0 19.8807 0 18.5C0 17.2334 0.618425 16.0466 1.65654 15.321L2.4271 14.7824C3.4128 14.0934 4 12.9666 4 11.764V7.60205C4 3.40355 7.40355 0 11.6021 0H12.4608C16.6246 0 20 3.37541 20 7.53918V11.6017C20 12.839 20.5907 14.0019 21.5898 14.7317L22.3785 15.3077C23.3976 16.052 24 17.2381 24 18.5C24 19.8807 22.8807 21 21.5 21H15.9646C15.7219 22.6961 14.2632 24 12.5 24ZM11.0854 21C11.2913 21.5826 11.8469 22 12.5 22C13.1531 22 13.7087 21.5826 13.9146 21H11.0854Z"/>
          </svg>

          <ProfilePic id="StatusBarProfilePic" authorName={userName}/>
          <Menu/>

        </div>

      </section>

      <Outlet/>
    </>
  )
})


export default StatusBar 