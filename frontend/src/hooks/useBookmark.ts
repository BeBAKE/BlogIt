// import { UIEvent, useState, useEffect } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../constants/backendURL";

// export type Bookmarks = {
//   blog : {
//     authorId: string; // who made the blog
//     authorName: string;
//     summaryTitle: string;
//     summaryBody: string;
//     createdAt: Date;
//   }
//   id: string; // id of bookmark
//   bookmarkedAt: Date;
//   userId: string; // user's id who bookmarked it
//   blogId: string; // blog's id
// }

// export type CursorInfo = {
//   myCursorId : string, // last bookmarks's id
//   myCursor : Date // last bookmarkedAt
// }

// type FetchingBookmark = {
//   token : string | null,
//   data ?: CursorInfo
// }

// type AxiosData = {
//   url : string,
//   method : string,
//   headers : Record<string,string>,
//   data ?: CursorInfo
// }


// const useBookmark = ()=>{
//   const [bookmarks, setBookmarks] = useState<Bookmarks[]>([])
//   const [bookmarksFinished, setBookmarksFinished] = useState(false)
//   const [loading, setLoading ] = useState(true)
//   const [cursorInfo, setCursorInfo] = useState<CursorInfo>()
//   const [sendRequestByScrolling, setSendRequestByScrolling] = useState(true)

    
//   useEffect(()=>{
//     // const val= {
//     //   "myCursorId" : "af85c4a8-951f-425a-8557-9885350a3d8e",
//     //   "myCursor" : new Date()
//     // }  
//     fetchingBookmark()
//   },[])

//   const fetchingBookmark = async(data?:CursorInfo,isOnScrolling=false)=>{
//     try {   
//       const token = localStorage.getItem("jwt")
//       const axiosData : AxiosData = {
//         method: "post",
//         url: `${BACKEND_URL}/api/v1/blog/bookmark/bulk`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       }    
//       if(isOnScrolling) axiosData.data = cursorInfo
//       const res = await axios(axiosData);

//       const fetchedBookmark : Bookmarks[] = res.data.data
//       if(fetchedBookmark.length===0) {
//         setBookmarksFinished(true)
//         return
//       }

//       setBookmarks(fetchedBookmark)
//       setCursorInfo({
//         myCursorId : fetchedBookmark[fetchedBookmark.length-1].id,
//         myCursor : fetchedBookmark[fetchedBookmark.length-1].bookmarkedAt
//       })
//       if(isOnScrolling){
//         setSendRequestByScrolling(true)
//       }
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   }


//   return {
//     bookmarks,
//     fetchingBookmark
//   }
//   const fetchBookmarks = async(position : number)=>{
//     if(position===100 && bookmarksFinished===false){
//       const token = localStorage.getItem("jwt");  
//       setSendRequestByScrolling(false)
//       setLoading(true)
//       try {
//         const res = await axios({
//           method: "post",
//           url: `${BACKEND_URL}/api/v1/blog/bookmark/bulk`,
//           data : cursorInfo,
//           headers: {
//             Authorization: `Bearer ${token}`,
//           }
//         })   
//         const fetchedBookmark : Bookmarks[] = res.data.data
//         if(fetchedBookmark.length===0) {
//           setBookmarksFinished(true)
//           return
//         }
//         setBookmarks(prev => [...prev,...fetchedBookmark])
//         setCursorInfo({
//           myCursorId : fetchedBookmark[fetchedBookmark.length-1].id,
//           myCursor : fetchedBookmark[fetchedBookmark.length-1].bookmarkedAt
//         })
//         setSendRequestByScrolling(true)
//       } catch (error) {
//         console.log(error)
//       } finally {
//         setLoading(false)
//       }
//     }
//   }
// }


// export default useBookmark;