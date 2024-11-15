import { useEffect, useState } from "react"
import DraftCard from "./DraftCard"
import axios from "axios"
import { BACKEND_URL } from "../../constants/backendURL"
import { useRecoilState } from "recoil"
import draftAtom from "../../store/atoms/DraftsAtom"

export type Drafts = {
  id : string,
  title : string,
  createdAt : string
}

const Draft = ()=>{
  const [drafts , setDrafts] = useRecoilState(draftAtom)
  const [isError , setIsError] = useState<boolean>(false)

  useEffect(()=>{
    const fetchDraft = async()=>{
      const token = localStorage.getItem("jwt")
      try {
        const res = await axios({
          method : "get",
          url: `${BACKEND_URL}/api/v1/draft`,
          headers : {
            Authorization: `Bearer ${token}`,
          }
        })
        console.log(res.data.data);
        
        setDrafts(res.data.data)
      } catch (error) {
        console.log(error)
        setIsError(true)
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
          Oops went is wrong
        </div>
        :
        drafts.map((e:Drafts,index:number)=>{
          const title = e.title ?? "Draft"
          const date = new Date((e.createdAt)).toString().split(" ")
          const daysAgo = (Math.floor(Date.now()) - (new Date(e.createdAt)).getTime())

          console.log(Math.floor(daysAgo/(1000*60*60*24)))

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
      {/* <div
      className={`text-xl ${!loading ? "hidden" : "flex flex-row justify-center items-center"}`}>
        Loading...
      </div> */}

    
    </div>
  )
}

export default Draft