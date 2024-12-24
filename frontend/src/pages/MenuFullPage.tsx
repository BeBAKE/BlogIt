import { Outlet } from "react-router-dom"
import MenuSideBar from "../components/Menu/MenuSideBar"
import { VerticalDivider } from "../components/Menu/MenuPopUp"

const MenuFullPage = ()=>{
  return (
    <div className="flex flex-row justify-start md:m-7 overflow-hidden">
      <div className="flex flex-row grow-0">
        <VerticalDivider/>
        <MenuSideBar/>
        <VerticalDivider/>
      </div>
      <div className="grow flex flex-row justify-center m-6 md:mx-12">
        <Outlet/>
      </div>
    </div>
  )
}

export default MenuFullPage