import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputForm from "../components/Form/InptForm"
import FormButton from "../components/Form/FormButton"
import { useCallback } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { SigninType } from "@bebake/blogit-common"
import { BACKEND_URL } from "../constants/backendURL"
import { jwtDecode } from "jwt-decode";
import { useSetRecoilState } from "recoil"
import jwtAtom from "../store/atoms/jwtAtom"

export type AutorJwtPayload = {
  authorId : string,
  authorName : string,
  exp : number
  iat : number
}


const Signin = () => {
  const navigate = useNavigate()
  const [formData,setFormData] = useState<SigninType>({
    email : "",
    password : ""
  })
  const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true)
  const setJwt = useSetRecoilState(jwtAtom)

  const submit = useCallback(()=>{
    if(!isFirstRequest) return
    
    if(formData.email.length==0 || formData.password.length==0){
      toast.error("Please enter values")
      return ;
    }   
    setIsFirstRequest(prev=>!prev)
    toast.promise(
      async()=>{
        try {
          const res = await axios({
            url : `${BACKEND_URL}/api/v1/signin`,
            method : "POST",
            data : {
              email : formData.email.trim(),
              password : formData.password.trim(),
            }
          })   
          const token = res.data.data as string
          setJwt(token)
          localStorage.setItem("jwt",token)

          const decoded = jwtDecode(token) as AutorJwtPayload
          localStorage.setItem("userName",decoded.authorName)   
          localStorage.setItem("userId",decoded.authorId)     
          navigate("/blogs")   
        } catch (error:any) {
          setIsFirstRequest(prev=>!prev)
          throw new Error(error)
        }
      },
      {
        pending: 'Signin in',
        success: 'User Signed in successfully',
        error: 'Error while singing in'
      }
    )

  },[formData,isFirstRequest])

  return (
    <div 
      id="form-space" 
      className="flex flex-row justify-center items-center md:w-1/2 h-screen px-6 w-full">
      <div 
        id="signin-form"
        className="flex flex-col bg-white h-fit md:w-96 items-center -translate-y-10">

          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Login 
          </h1>
          <h3 className="text-neutral-500 mb-8 md:text-base text-sm">
            Don't have an account? <Link to={`/signup`}><u>Sign up</u></Link>
          </h3>
          <div id="signin-form-inputs" className="flex flex-col w-full gap-2.5">

            <InputForm 
              id="email" placeholder="some@thing.com" label="Email"  
              onChange={(e:any)=>{
              setFormData(prev => prev={...prev,email : e.target.value})
              }}
            />
            <InputForm 
              type="password"
              id="password" label="Password" 
              onChange={(e:any)=>{
              setFormData(prev => prev={...prev,password : e.target.value})
              }}
            />

            <FormButton label="Sign In" onClick={submit} isFirstRequest={isFirstRequest}/>

          </div>


      </div>
      
    </div>

  )
}



export default Signin