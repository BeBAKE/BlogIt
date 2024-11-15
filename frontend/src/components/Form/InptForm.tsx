import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react"

type InputFormType = {
  id : string,
  placeholder ?: string,
  label:string,
  onChange : ChangeEventHandler<HTMLInputElement>,
  type ?:  HTMLInputTypeAttribute
}

const InputForm = React.memo(({id,placeholder,label,onChange,type}:InputFormType )=>
  {
  
  return <>
    <label
      className="font-semibold">
      {label}
    </label>
    <input 
      id={id}
      className="border-2 py-2.5 px-2.5 rounded-xl mb-2.5 outline-none text-sm"
      placeholder={placeholder?placeholder:""}
      onChange={onChange}
      type={type}
      />
  </>
})

export default InputForm
