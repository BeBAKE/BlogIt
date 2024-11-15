type FormButtonType = {
  label : string
  onClick : ()=>Promise<void>,
}
const FormButton = ({label,onClick}:FormButtonType) => {
  return <>
  <button
    type="submit"
    onClick={onClick}
    className={` text-white w-full h-10 rounded-lg bg-black active:bg-slate-900`}>
      {label}
  </button>
  </>
}

export default FormButton