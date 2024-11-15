import { Outlet } from "react-router-dom"
import MenuSideBar from "../components/Menu/MenuSideBar"
import { VerticalDivider } from "../components/Menu/MenuPopUp"

const MenuFullPage = ()=>{
  return (
    <div className="flex flex-row m-10 overflow-hidden">
      <VerticalDivider/>
      <MenuSideBar/>
      <VerticalDivider/>
      <Outlet/>
    </div>
  )
}

export default MenuFullPage