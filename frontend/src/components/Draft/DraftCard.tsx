import { useNavigate } from "react-router-dom"
import DraftMore from "./DraftMore"

export type DraftCardProps = { 
  index : number,
  id : string,
  date : string[],
  title : string,
  daysAgo : number
}

const DraftCard = ({
  index,
  id,
  date,
  title,
  daysAgo
}:DraftCardProps)=>{

  const nav = useNavigate()
  
  
  return (
  <section
    className={`h-fit py-10 flex flex-row items-center justify-between md:gap-20 md:w-[375px] lg:w-[625px] ${index!==0 ? "border-t-[1px]" : ""}`}>
    
    <div id="blogInfo" className="flex flex-col gap-5 w-full" >

      {/* Title */}
      <div className="flex flex-col gap-2"
        onClick={()=>nav(`/blogs/create/${id}`)}>
        <p className="font-bold text-xl">
          {title==="" || !title ? "Draft" : title.substring(0,130)}
        </p>
      </div>

      {/* Date , length , more option  -> row */}
      <div className="w-full flex flex-row justify-between">
        <div className="w-full flex flex-row justify-start gap-6">
          {/* Date */}
          <h4 className="text-neutral-500 font-light text-sm">
            Created on {`${date[1]} ${date[2]}, ${date[3]}`}
          </h4>
          {/* days ago */}
          <h4 className="text-neutral-500 font-light text-sm">
            {daysAgo} days ago
          </h4>
        </div>


        {/* More option */}
        <div className="flex justify-end w-full">
          <DraftMore 
            index={index} 
            id={id}
            />
        </div>
      </div>

    </div>
    
  </section>
  )
}

export default DraftCard