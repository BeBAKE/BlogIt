import { useEffect, useState, memo } from "react"
import axios from "axios"
// import 'react-loading-skeleton/dist/skeleton.css'
import QuoteFormSkeleton from "../skeleton/QuoteForm"


type QuoteObjType = {
  quote : string,
  author : string,
  position : string
}

const QuoteForm = memo(()=>{
  const [ quoteObj , setQuoteObj ] = useState<QuoteObjType>()
  const [ loading, setLoading ] = useState<boolean>(true)
  useEffect(()=>{
    const fetchQuotes = async()=>{
      try {
        const quotes = await axios("https://backend.liveproject.workers.dev/api/v1/generate")
        setQuoteObj(quotes.data.data)
        setLoading(prev=>!prev)
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuotes()
  },[])
  return (
    // <QuoteFormSkeleton/>
    loading ? <QuoteFormSkeleton/> :
    <div 
      id="quotes-space"
      className="md:flex md:flex-row md:justify-center md:items-center md:bg-gray-100 md:w-1/2 h-screen md:pl-32 md:pr-16 hidden">
      <div className="h-fit w-fit">
        <h3 className="text-3xl font-bold mb-6">
          {quoteObj?.quote}
        </h3>
        <h4 className="text-lg font-bold">
          {quoteObj?.author}
        </h4>
        <h5 className="text-neutral-600 text-md">
          {quoteObj?.position}
        </h5>
      </div>  
      
    </div>
  )
})


export default QuoteForm