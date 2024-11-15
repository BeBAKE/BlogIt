import { useEffect, useState } from "react"
import BookmarkFloatingMenu from "../components/Menu/BookmarkFloatingMenu"


const Test = ()=>{
  const test = async(e:any)=>{
    return new Promise((r)=>{
      for(let i=0 ; i<=100000 ; i++){
        let x = 0 
        x+=x
        console.log(x)
      }
      r
    }).then(()=>console.log(e.target.innerText)).catch((error)=>console.log(error))
  }
  return <div className="h-screen w-screen flex flex-col justify-center items-center">

    <div className="flex flex-col gap-8 justify-center items-center">

      <button onClick={test}
      className="bg-gray-400 active:bg-gray-700 w-16 h-8 rounded-xl">1</button>

      <button onClick={test}
      className="bg-gray-400 active:bg-gray-700 w-16 h-8 rounded-xl">2</button>

      <button onClick={test}
      className="bg-gray-400 active:bg-gray-700 w-16 h-8 rounded-xl">3</button>

      <button onClick={test}
      className="bg-gray-400 active:bg-gray-700 w-16 h-8 rounded-xl">4</button>

      <button onClick={test}
      className="bg-gray-400 active:bg-gray-700 w-16 h-8 rounded-xl">5</button>
    
    </div>
  </div>
  // const [count , setCount] = useState("")
  // useEffect(()=>{
  //   const handler = (e:any)=>{
  //     if(e.target.id === "some"){
  //       setCount("window")
  //       console.log("window")
  //     }
  //   }
  //   window.addEventListener("click",handler)

  //   return ()=>{
  //     window.removeEventListener("click",handler)
  //   }
  // })

  // return <div
  // className="h-screen w-screen flex flex-col gap-8 justify-center items-center">
  //   <div 
  //   id="some"
  //   className="bg-red-100 h-20 w-20"
  //   onClick={()=>{
  //     setCount("tailwind")
  //     console.log("tailwind")
  //   }}>
  //     this is div
  //   </div>
  //   <button onClick={()=>console.log(count)}>fsd p</button>
  // </div>
  // const [popUp, setPopUp] = useState<boolean>(false)

  // const click = ()=>{
  //   setPopUp(prev => !popUp)
  // }



  // return <div className="flex flex-row justify-center items-center h-screen w-screen bg-red-100">
  //   <button className="absolute top-8 bg-white h-8 w-16 rounded-xl active:bg-gray-400"
  //   onClick={click}>click</button>
  //   <div className="flex flex-col gap-8 justify-center items-center bg-yellow-100 h-[600px] w-[600px] overflow-scroll">

  //     <div className="flex flex-row justify-center items-center h-96 w-96   bg-gray-300 relative">
  //       <BookmarkFloatingMenu/>
  //     </div>
  //     <div className="flex flex-row justify-center items-center h-96 w-96   bg-gray-300 relative">
  //       <BookmarkFloatingMenu/>
  //     </div>


  //   </div>
  // </div>
}
export default Test