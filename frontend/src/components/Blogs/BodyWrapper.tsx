import { memo } from "react"

const BodyWrapper = memo(({content}:{content:string}):React.ReactNode =>{

  return <p contentEditable={true} //! copy this one
      className="font-charter text-[rgb(41,41,41)] text-[1.29rem] leading-[34px] break-words text-wrap tracking-wide outline-none">
      {content}
    </p>
  
})

export default BodyWrapper