import { Context } from "hono";
import getPrisma from "../db";
import { bookmarkCursor, CreateBookmark } from "@bebake/blogit-common";
/*

  id           String   @id
  summarytitle String   @db.VarChar
  summarybody  String   @db.VarChar
  authorName   String
  createdAt    DateTime @default(now())
  authorId     String

*/

type DataForGetAll = {
  myCursorId : string, // bookmarks's id
  myCursor : Date // bookmarkedAt
}

// "2024-11-11 12:50:41.159"
// "2024-11-11T12:50:41.159Z"

export const getBookmark = async(c:Context)=>{
  try {

  } catch (error) {

  }
}

export const getAllBookmarks = async(c:Context)=>{
  try {
    const prisma = await getPrisma(c.env.DATABASE_URL)
    const parsedData : DataForGetAll = c.get("parsedData")
    const cursorInfo = parsedData
    ? { id : parsedData.myCursorId , bookmarkedAt : parsedData.myCursor} 
    : undefined

    const skip = cursorInfo ? 1 : 0

    console.log("here is the cursorInfo : ",cursorInfo)
    const bookmarks = await prisma.bookmark.findMany({
      take : 4,
      skip : skip,
      cursor : cursorInfo,
      orderBy : {
        bookmarkedAt : 'desc'
      },
      include : {
        blog : {
          select : {
            summaryTitle : true,
            summaryBody : true,
            createdAt : true,
            authorName : true,
            authorId : true
          }
        }
      }
    })
    return c.json({success : true, message : "Bookmarks fetched successfully",data : bookmarks},200)
  } catch (error) {
    console.log(error)
    return c.json({success : false, message : "Internal Server Error"},500)
  }
}


// data to be sent fron frontend
/*
  id (bookmark id ) [ in body ]
  userId ( user who has bookmarked ) [ from auth ]
  blogId ( id of the blog thats been bookmarked ) [ in route params ]
*/
export const createBookmark = async(c:Context)=>{
  try {
    const prisma = await getPrisma(c.env.DATABASE_URL)
    const { id } = c.req.param()
    if(!id) return c.json({success : false, message : "Invalid blog id"},400)

    // const data : CreateBookmark = await c.req.json() // for old bookmarks 
    //before deleting , change the createBookmarkType
    const data : { id : string} = await c.req.json()

    const userId = c.get("authorId")
    
    // const bookmark = await prisma.bookmark.create({
    //   data : {
    //     id : data.id,
    //     summaryTitle : data.summaryTitle,
    //     summaryBody : data.summaryBody,
    //     authorName : data.authorName,
    //     createdAt : data.createdAt,
    //     authorId : authorId,
    //   }
    // })

    const bookmark = await prisma.bookmark.create({
      data : {
        id : data.id,//bookmark's id 
        userId : userId, // person who bookmarked it
        blogId : id, // one which is sent through route params
      }
    })

    return c.json({success : true, message : "Bookmard added"},200)
    
  } catch (error) {
    // if(error.code==='P2002') // unique id voilation
    return c.json({success : false, message : "Internal Server Error"},500)
  }
}

export const removeBookmark = async(c:Context)=>{
  try {
    const prisma = await getPrisma(c.env.DATABASE_URL)
    const { id } = c.req.param()
    if(!id) {
      return c.json({success : false,message : "No valid identifier provided for the bookmark"},400)
    }
    const bookmark = await prisma.bookmark.delete({
      where : {
        id : id
      }
    })
    return c.json({success : true, message : "bookmark removed"},200)

  } catch (error:any) {
    if(error.code==='P2025') return c.json({success : false,message : "bookmark not found"},404)
    return c.json({success : false, message : "Internal Server Error"},500)
  }
}

