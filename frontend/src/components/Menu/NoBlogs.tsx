const NoBlogs = ({label}:{label : string})=>{
  return <div className="mt-6 flex flex-col items-center gap-4">
    <h3 className="font-semibold text-base text-gray-700">No Blogs Here</h3>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
}

export default NoBlogs