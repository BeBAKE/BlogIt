type BlogHeaderWrapper = { 
  label : string
}

const BlogHeaderWrapper = ({label}:BlogHeaderWrapper)=>{
  return (
  <p className="text-neutral-500 hover:text-neutral-800">
    {label}
  </p>
  )
}

export default BlogHeaderWrapper