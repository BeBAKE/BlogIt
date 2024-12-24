import React, { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react"
import { EyeClose, EyeOpen } from "../../Logo/SeekPasswordLogo"

type InputFormType = {
  id : string,
  placeholder ?: string,
  label:string,
  onChange : ChangeEventHandler<HTMLInputElement>,
  type ?:  HTMLInputTypeAttribute
}

const InputForm = React.memo(({id, placeholder, label, onChange, type}: InputFormType) => {
  const [showPassword, setShowPassword] = useState(false)
  
  return <>
    <label className="font-semibold text-sm md:text-base">
      {label}
    </label>
    <div className="relative">
      <input 
        id={id}
        className="border-2 py-2.5 px-2.5 rounded-xl mb-2.5 outline-none text-sm w-full"
        placeholder={placeholder?placeholder:""}
        onChange={onChange}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 mb-2.5">
          { showPassword ? <EyeClose/> : <EyeOpen/> }
        </button>
      )}
    </div>
  </>
})

export default InputForm