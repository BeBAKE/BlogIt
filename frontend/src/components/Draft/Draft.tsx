import { useEffect, useState } from "react"
import DraftCard from "./DraftCard"
import axios from "axios"
import { BACKEND_URL } from "../../constants/backendURL"
import { useRecoilState, useRecoilValue } from "recoil"
import draftAtom from "../../store/atoms/DraftsAtom"
import jwtAtom from "../../store/atoms/jwtAtom"
import { toast } from "react-toastify"

export type Drafts = {
  id : string,
  title : string,
  createdAt : string
}

const Draft = ()=>{
  const [drafts , setDrafts] = useRecoilState(draftAtom)
  const [isError , setIsError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const jwt = useRecoilValue(jwtAtom)

  useEffect(()=>{
    const fetchDraft = async()=>{
      try {
        if(jwt==="invalid") {
          toast.error("invalid token")
          throw new Error("invalid token")
        }
        const res = await axios({
          method : "get",
          url: `${BACKEND_URL}/api/v1/draft`,
          headers : {
            Authorization: `Bearer ${jwt}`,
          }
        })
        
        setDrafts(res.data.data)
        setLoading(prev=>!prev)
      } catch (error) {
        console.log(error)
        setIsError(true)
        setLoading(false)
      }
    }

    fetchDraft()
  },[])


  return (
    <div className="w-full h-screen flex flex-col justify-start items-center mx-12 overflow-y-scroll">

      <div className="text-4xl font-bold self-center mb-16">
        Drafts
      </div>

      {
        isError 
        ?
        <div className="text-2xl font-extralight">
          Oops! something went wrong
        </div>
        :
        drafts.map((e:Drafts,index:number)=>{
          const title = e.title ?? "Draft"
          const date = new Date((e.createdAt)).toString().split(" ")
          const daysAgo = (Math.floor(Date.now()) - (new Date(e.createdAt)).getTime())
          return ( 
            <DraftCard
              key={index}
              index={index}
              id={e.id}
              date={date}
              title={title}
              daysAgo={Math.floor(daysAgo/(1000*60*60*24))}
            />
            )
        })        
      }

      {/* Loader for cursor scrolling */}
      <div
      className={`text-xl ${!loading ? "hidden" : "flex flex-row justify-center items-center"}`}>
        Loading...
      </div>

    
    </div>
  )
}

export default Draft