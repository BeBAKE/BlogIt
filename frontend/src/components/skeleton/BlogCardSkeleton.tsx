export const BlogCardSkeleton = ({index}:{index:number})=>{
  return (
    <section
      className={`h-fit w-full py-10 flex flex-row items-center gap-8 md:gap-20 md:max-w-[675px] lg:max-w-[925px] ${index!==0 ? "border-t-[1px] border-gray-300" : "" } animate-pulse`}>

      <div id="blogInfo" className="flex flex-col gap-5 w-full">
  
        <nav className="flex flex-row justify-start items-center gap-3">
          <div id="profilePic" className='min-h-8 min-w-8 max-h-8 max-w-8 bg-gray-200 dark:bg-gray-300 rounded-full'></div>
          <h3 id="authorName" className="h-2 w-6 bg-gray-200 dark:bg-gray-300 rounded-full"></h3>
          <h4 id="date" className="h-2 w-8 bg-gray-200 dark:bg-gray-300 rounded-full"></h4>
        </nav>
  
        <main className="flex flex-col gap-5 w-full">
          <div className="h-6 lg:w-[700px] w-[350px] bg-gray-200 dark:bg-gray-300 rounded-full">{/* {title} */}</div>

          <div className="h-6 lg:w-[350px] w-[150px] bg-gray-200 dark:bg-gray-300 rounded-full mt-[-10px]">{/* {title} */}</div>

          <div className="h-4 lg:w-[700px] w-[350px] bg-gray-200 dark:bg-gray-300 rounded-full">{/* {body.substring(0,141)}... */}</div>

          <div className="h-4 lg:w-[700px] w-[350px] bg-gray-200 dark:bg-gray-300 rounded-full">{/* {body.substring(0,141)}... */}</div>

          <div className="h-4 lg:w-[700px] w-[350px] bg-gray-200 dark:bg-gray-300 rounded-full">{/* {body.substring(0,141)}... */}</div>
        </main>
  
        <footer className="flex flex-row justify-between items-center">
          <div>
            <div className="h-3 w-6 bg-gray-200 dark:bg-gray-300 rounded-full">
            </div>
          </div>
  
          <div className="flex flex-row gap-3 items-center">
            <div 
              className="h-6 w-2 bg-gray-200 dark:bg-gray-300 rounded-full "></div>
            <div 
              className="h-2 w-4 bg-gray-200 dark:bg-gray-300 rounded-full"></div>
          </div>
        </footer>
  
      </div>
  
      <div
        className="hidden md:block"
        id="blogImage">
        {/* <div className="min-h-32 min-w-40 max-h-32 max-w-40 bg-gray-200 dark:bg-gray-300"></div> */}
        <div className="flex items-center justify-center min-h-32 min-w-40 max-h-32 max-w-40 bg-gray-200 dark:bg-gray-300 rounded sm:w-96">
          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
