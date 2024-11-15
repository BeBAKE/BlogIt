const QuoteFormSkeleton = ()=>{
  return  (
    // <div className="text-6xl">laoding</div>
    <div 
      id="quotes-space"
      className="md:flex md:flex-row md:justify-center md:items-center md:bg-gray-100 md:w-1/2 h-screen md:pl-32 md:pr-16 hidden">
      <div 
        className="h-fit w-full animate-pulse">
        <h3 
          className="h-9 mb-6 text-3xl bg-gray-200 dark:bg-gray-300 w-2/3 rounded-full mb-14">
        </h3>
        <h4 
          className="h-4 bg-gray-200 dark:bg-gray-300 w-1/3 mb-4 rounded-full">
        </h4>
        <h5 
          className="h-4 bg-gray-200 dark:bg-gray-300 w-1/3 rounded-full">
        </h5>
      </div>  
      
    </div>
  )
}

export default QuoteFormSkeleton