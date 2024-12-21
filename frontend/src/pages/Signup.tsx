import { useState, useCallback } from "react"

import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

import InputForm from "../components/Form/InptForm"
import FormButton from "../components/Form/FormButton"
import { SignupType } from "@bebake/blogit-common"

import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from "../constants/backendURL"

import { jwtDecode } from "jwt-decode";
import { AutorJwtPayload } from "./Signin"
import jwtAtom from "../store/atoms/jwtAtom"
import { useSetRecoilState } from "recoil"

const Signin = () => {
  const navigate = useNavigate()
  const [formData,setFormData] = useState<SignupType>({
    fullname : "",
    email : "",
    password : "",
  })
  const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true)
  const setJwt = useSetRecoilState(jwtAtom)

  const submit = useCallback(async()=>{
    if(!isFirstRequest) return

    if(formData.email.length==0|| formData.password.length==0 || formData.fullname.length==0){
      toast.error("Please Enter values")
      return ;
    }
    setIsFirstRequest(prev=>!prev)
    toast.promise(
      async()=>{
        try {
          const res = await axios({
            url : `${BACKEND_URL}/api/v1/signup`,
            method : "POST",
            data : {
              email : formData.email.trim(),
              password : formData.password.trim(),
              fullname : formData.fullname.trim()
            }
          })
          const token = res.data.data as string
          setJwt(token)
          localStorage.setItem("jwt",token)  

          const decoded = jwtDecode(token as string) as AutorJwtPayload
          localStorage.setItem("userName",decoded.authorName)
          localStorage.setItem("userId",decoded.authorId) 
          navigate("/blogs") 
        } catch (error:any) {
          setIsFirstRequest(prev=>!prev)
          throw new Error(error)
        }
      },
      {
        pending: 'Registering User',
        success: 'User Registered successfully',
        error: 'Error while registering'
      }
    )
  },[formData])

  return (
    <div 
      id="form-space" 
      className="flex flex-row justify-center items-center w-full md:w-1/2 h-screen px-6">
      <div 
        id="signin-form"
        className="flex flex-col bg-white h-fit w-96 items-center">

          <h1 className="text-4xl font-bold mb-2">
            Create an account
          </h1>
          <h3 className="text-neutral-500 mb-8">
            Already have an account? <Link to={`/signin`}><u>Login</u></Link>
          </h3>
          <div id="signin-form-inputs" className="flex flex-col w-full gap-2.5">

            <InputForm id="fullname" placeholder="Enter your fullname" label="fullname" 
            onChange={(e)=>{
              setFormData(prev => prev={...prev,fullname:e.target.value})
            }}
            />

            <InputForm id="email" placeholder="some@thing.com" label="Email" onChange={(e)=>{
              setFormData(prev => prev = {...prev,email:e.target.value})
            }}
            />

            <InputForm 
            type="password"
            id="password" label="Password" 
            onChange={(e)=>{
              setFormData(prev => prev = {...prev,password:e.target.value})
            }}
            />

            
            <FormButton label="Sign Up" onClick={submit} isFirstRequest={isFirstRequest}/>
          </div>


      </div>
    </div>

  )
}



export default Signin