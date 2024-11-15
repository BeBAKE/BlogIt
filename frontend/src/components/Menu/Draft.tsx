const Draft = ()=>{
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center mx-12 overflow-y-scroll">
      <div className="text-4xl font-bold self-center mb-16">
        Drafts
      </div>
      {/* {
        bookmarks.map((e:Bookmarks,index:number)=>{
          const date = new Date((e.blog.createdAt)).toString().split(" ")
          return ( 
            <BlogCard
              key={index}
              index={index}
              id={e.blog.authorId}//id - just to avoid error in BlogCard
              summaryTitle={e.blog.summaryTitle}
              summaryBody={e.blog.summaryBody}
              date={date}
              documentId={e.blogId}
              authorName={e.blog.authorName}
              isBlog={false}
              bookmarkId={e.id}
              />
            )
        })
      } */}

      {/* Loader for cursor scrolling */}
      {/* <div
      className={`text-xl ${!loading ? "hidden" : "flex flex-row justify-center items-center"}`}>
        Loading...
      </div> */}

    
    </div>
  )
}

export default Draft