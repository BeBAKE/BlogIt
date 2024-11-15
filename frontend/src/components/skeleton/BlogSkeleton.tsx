
// import ProfilePic from "../components/StatusBar/ProfilePic"

const BlogSkeleton = () => {
  //   const getRandomWidth = (min: number, max: number) => {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  return (
  <section
    className="flex flex-col md:flex-row ms-24 mt-16 me-8 gap-8 h-full justify-evenly animate-pulse mb-10">

    <div className="flex flex-col gap-4">
      <h1 className="h-10 bg-gray-200 dark:bg-gray-400 rounded-full w-[350px] md:w-[450px] lg:w-[682px] 2xl:w-[890px]"></h1> {/* title */}
      <h1 className="h-10 w-[300px] bg-gray-200 dark:bg-gray-400 rounded-full mb-6 max-w-[350px] md:max-w-[450px]  lg:max-w-[682px] 2xl:max-w-[890px]"></h1> {/* title 2nd line */}

      <h3 className="h-4 w-40 ms-1 mb-10 bg-gray-200 dark:bg-gray-400 rounded-full mb-3"></h3> {/* publishing date */}

      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[350px] md:max-w-[450px]  lg:max-w-[682px] 2xl:max-w-[890px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[250px] md:max-w-[430px]  lg:max-w-[622px] 2xl:max-w-[840px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[250px] md:max-w-[430px]  lg:max-w-[612px] 2xl:max-w-[790px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[350px] md:max-w-[450px]  lg:max-w-[682px] 2xl:max-w-[890px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[350px] md:max-w-[410px]  lg:max-w-[582px] 2xl:max-w-[790px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[350px] md:max-w-[450px]  lg:max-w-[682px] 2xl:max-w-[890px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[299px] md:max-w-[380px]  lg:max-w-[592px] 2xl:max-w-[790px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[350px] md:max-w-[450px]  lg:max-w-[682px] 2xl:max-w-[890px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[350px] md:max-w-[450px]  lg:max-w-[682px] 2xl:max-w-[890px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[299px] md:max-w-[380px]  lg:max-w-[592px] 2xl:max-w-[790px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[299px] md:max-w-[380px]  lg:max-w-[592px] 2xl:max-w-[790px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[350px] md:max-w-[450px]  lg:max-w-[682px] 2xl:max-w-[890px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[350px] md:max-w-[450px]  lg:max-w-[682px] 2xl:max-w-[890px]"></div>
      <div className="h-5 bg-gray-200 dark:bg-gray-400 rounded-full mb-2.5 max-w-[350px] md:max-w-[450px]  lg:max-w-[682px] 2xl:max-w-[890px]"></div>
    </div>

    <div
      className="min-w-[100px]">
      <h4
      className="text-neutral-600 text-lg mb-4">Author</h4>
      <div className="flex flex-row gap-4">
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-400 rounded-full">
        </div>
        <p className="h-8 w-36  bg-gray-200 dark:bg-gray-400 rounded-full">
          {/* Jokester */}
        </p>
      </div>
    </div>
  </section>
  )
}

export default BlogSkeleton