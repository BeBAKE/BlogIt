import { Context } from "hono";
import getPrisma from "../db";
import { CreatePostType, deltaSchema, UpdatePostType } from "@bebake/blogit-common";
import { DeltaToText, deltaToText } from "../misc/DeltaToText";
import { JsonArray } from "@prisma/client/runtime/library";
import { DataForGetAll } from "./bookmarks";

import {z} from 'zod'
// import { deltaSchema } from "../misc/zodSchema";

export const getBlog = async(c:Context)=>{
  const id = c.req.param("id")
  if(!id){
    return c.json({success : false,message : "Invalid post Id"},400)
  }
  try {
    const prisma = await getPrisma(c.env.DATABASE_URL)
    const authorId = c.get("authorId")
    const blog = await prisma.blog.findFirst({
      where : {
        id : id
      }
    })
    if(!blog){
      return c.json({success : false,message : "Invalid post id"},400)
    }
    const parsedData = {
      ...blog,
      owner : (authorId === blog?.authorId) ? true : false
    }    
    return c.json({success : true , message : "post fetched successfully",data : parsedData},200)
  } catch (error) {
    return c.json({success : false,message : "Internal Server Error"},500)
  }
}

//! putting pagination here 
//? per page 10 blogs  
export const getAllBlog = async(c:Context)=>{
  try {
    const authorId = c.get("authorId") // it is userId
    const prisma = await getPrisma(c.env.DATABASE_URL)
    const { page } = c.req.query()
    const take = 10;
    const skip = page ? (Number(page)-1)*take : 0

    //Select * , can cause speed issues
    const [blogs, totalBlogs] = await Promise.all([
      prisma.blog.findMany({
        select : {
          id : true,
          summaryTitle : true,
          summaryBody : true,
          createdAt : true,
          authorId : true,
          authorName : true,
          image : true,
          Bookmark : {
            where : {
              userId : authorId
            }
          }
        },
        take : take,
        skip : skip,
      }),
      prisma.blog.count()
    ])

    return c.json({
      success : true,
      message : page ? "Post fetched successfully" : "Warning! Page number missing",
      data : blogs,
      details: {
        totalBlogs : totalBlogs,
        itemsPerPage : take
      }
    }, 201 )

  } catch (error) {
    console.log(error)
    return c.json({success : false,message : "Internal Server Error"},500)
  }
}

// get all the publisehd blogs
export const getPublished = async(c:Context)=>{
  try {
    const prisma = await getPrisma(c.env.DATABASE_URL)
    const parsedData : DataForGetAll = c.get("parsedData")
    const cursorInfo = parsedData
    ? { id : parsedData.myCursorId , createdAt : parsedData.myCursor} 
    : undefined

    const skip = cursorInfo ? 1 : 0

    const authorId = c.get("authorId") // id of user who has bookmarked the blog

    const publisehdBlogs = await prisma.blog.findMany({
      where : {
        authorId : authorId
      },
      take : 10,
      skip : skip,
      cursor : cursorInfo,
      orderBy : {
        createdAt : 'desc'
      }
    })
    return c.json({success : true, message : "Published Blogs fetched successfully",data : publisehdBlogs},200)
  } catch (error) {
    console.log(error)
    return c.json({success : false, message : "Internal Server Error"},500)
  }
}

// for simple blogs ( not for the quill one)
// export const updateBlog = async(c:Context)=>{
//   const {id} = c.req.param()
//   if(!id){
//     return c.json({success : false , message:"Invalid id"},400)
//   }
//   const {body,title} : UpdatePostType = c.get("parsedData")
//   if(!body && !title){
//     return c.json({success : false,message : "Invalid data"},400)
//   }
//   const authorId = c.get("authorId")
//   try {
//     const prisma = await getPrisma(c.env.DATABASE_URL)
//     const updatedBlog = await prisma.blog.update({
//       where : {
//         id : id,
//         authorId : authorId
//       },
//       data : {
//         body : body,
//         title : title
//       }
//     })
//     return c.json({success : true,message : "post updated successfully"},200)
//   } catch (error) {
//     return c.json({success : false,message : "Internal Server Error"},500)
//   }
  
// }


/*

!create blog 

-> publish button pressed (frontend)
-> make call to cloudflare backend (createBlog)
-> documentid from frontend
-> prisma reads from Draft db
-> authorId and authorName from the token send from frontend

-> convert draft.title and draft.body to plain text
-> put that in the summaryTitle and summaryBody 

-> BlogHome will get summaryTitle and body 
-> Blog will get the delta title and summary

*/
type ErrorMessage = {
  titleErrorMessage ?: object,
  bodyErrorMessage ?: object
}
export const createBlog = async(c:Context)=>{
  try {
    const prisma = await getPrisma(c.env.DATABASE_URL)
    const { id } = c.req.param()
    const draft = await prisma.draft.findFirst({
      where : {
        id : id,
      }
    })

    if(!draft) {
      throw new Error("no draft exist")
    }
    const authorId = c.get("authorId")
    const authorName = c.get("authorName")

    //parsing the tile and body from the draft
    // added schema validation becuase empty title or body causes error in deltaToText
    const parsedTitleData = deltaSchema.safeParse(draft.title)
    const parsedBodyData = deltaSchema.safeParse(draft.body)

    if(!parsedTitleData.success || !parsedBodyData.success){
      const titleErrorMessage = !parsedTitleData.success 
      ? parsedTitleData.error.issues.map((issue : any)=>{
            return `${issue.path.join(".")} :- ${issue.message} `
          })
      : undefined
      const bodyErrorMessage = !parsedBodyData.success 
      ? parsedBodyData.error.issues.map((issue : any)=>{
            return `${issue.path.join(".")} :- ${issue.message} `
          })
      : undefined

      const errorMessage : ErrorMessage = {}
      if(titleErrorMessage) errorMessage.titleErrorMessage=titleErrorMessage
      if(bodyErrorMessage) errorMessage.bodyErrorMessage=bodyErrorMessage

      return c.json({success : false,message : "Invalid Data",detail : errorMessage},400)
    }

    const titleDeepCopy = JSON.parse(JSON.stringify(draft.title))
    const bodyDeepCopy = JSON.parse(JSON.stringify(draft.body))

    const plainTitle = deltaToText(titleDeepCopy as DeltaToText,"title") 
    const plainBody = deltaToText(bodyDeepCopy as DeltaToText,"body")    

    const blog = await prisma.$transaction([
      prisma.blog.create({
        data : {
          id : draft.id,
          title : draft.title as JsonArray,
          body : draft.body as JsonArray,
          summaryTitle : plainTitle,
          summaryBody : plainBody,
          authorId : authorId,
          authorName : authorName
        }
      }),
      prisma.draft.delete({
        where : {
          id : id
        }
      })  
    ])    
    return c.json({success:true,message : "post created successfully",data : { id : blog[0].id }},200)
  } catch (error) {
    console.log(error); 
    return c.json({success : false,message : "Internal Server Error"},500)
  }
}

export const deleteBlog = async(c:Context)=>{
  try {
    const prisma = await getPrisma(c.env.DATABASE_URL)
    const { id } = c.req.param()
    const authorId = c.get("authorId")

    const blog = await prisma.blog.delete({
      where : {
        id : id,
        authorId : authorId
      }
    })
    
    return c.json({success : true, message : "Blogs deleted successfully"},200)
  } catch (error) {
    console.log(error); 
    return c.json({success : false,message : "Internal Server Error"},500)    
  }
}


/*

!update blog 

-> update button pressed (frontend)
-> prisma finds in Blog and then create in Draft 
-> frontend moved to createBlog page (with docId in the url of it)
    ( can't write anything because quill is disables and enables when something is on screen )
-> 



*/