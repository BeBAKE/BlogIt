type FormButtonType = {
  label : string
  onClick : ()=>void,
  isFirstRequest : boolean
}
const FormButton = ({label,onClick,isFirstRequest}:FormButtonType) => {
  return <>
  <button
    type="submit"
    disabled={!isFirstRequest}
    onClick={onClick}
    className={`${isFirstRequest ? "active:bg-slate-900" : ""} text-white w-full h-10 rounded-lg  bg-black mt-3 text-sm md:text-base`}>
      {label}
  </button>
  </>
}

export default FormButton