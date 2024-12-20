import { MenuSection1, MenuSectionBottom, MenuSectionBreak } from "./MenuPopUp"

const MenuSideBar = ()=>{
  return (
    <div className="h-screen md:w-64 w-1/3 flex flex-col gap-2 text-gray-800 hidden lg:block">
      <MenuSection1 gap={"6"}/>
      <MenuSectionBreak/>
      <MenuSectionBottom/>
    </div>
  )
}

export default MenuSideBar