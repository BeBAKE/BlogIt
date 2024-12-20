import { Context } from "hono"
import getPrisma from "../db"
import { Prisma } from "@prisma/client/edge"


export const getFollowing = async(c:Context)=>{
  try {
    const id = c.get("authorId")
    const prisma = await getPrisma(c.env.DATABASE_URL)

    const followingList = await prisma.following.findMany({
      where : { followerId : id }
    })

    return c.json({success : true, message : `following list fetched successfully`,data : followingList},200)
  } catch (error) {
    console.log(error)
    return c.json({success:false,message:"Internal Server Error"},500)
  }
}

export const getFollowingBlogs = async(c:Context)=>{
  try {
    const authorId = c.get("authorId") // it is userId
    const prisma = await getPrisma(c.env.DATABASE_URL)
    const {followingIds, page } = await c.req.json()
    
    const take = 10;
    const skip = page ? (Number(page)-1)*take : 0

    //Select * , can cause speed issues
    const [blogs, totalBlogs] = await Promise.all([
      prisma.blog.findMany({
        where : { authorId : { in : followingIds } },
        orderBy : {
          createdAt : 'desc'
        },
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
      prisma.blog.count({
        where : {authorId : {in : followingIds}}
      })
    ])

    return c.json({
      success : true,
      message : page ? "Post fetched successfully" : "Post fetched successfully Warning! Page number missing",
      data : blogs,
      details: {
        totalBlogs : totalBlogs,
        blogOnCurrentPage : blogs.length,
        itemsPerPage : take
      }
    }, 201 )

  } catch (error) {
    console.log(error)
    return c.json({success : false,message : "Internal Server Error"},500)
  }
}

export const createFollowing = async(c:Context)=>{
  try {
    const id = c.get("authorId")
    const { followingId } = await c.req.json()
    if(!followingId) return c.json({success:false,message :"invalid data sent"})
    // if(id===followingId) return c.json({success:false,message :"Can't follow yourself"})

    const prisma = await getPrisma(c.env.DATABASE_URL)

    await prisma.following.create({
      data : {
        followingId : followingId,
        followerId : id
      }
    })

    return c.json({success : true, message : `Author followed`},200)
  } catch (error : any) {
    console.log(error)
    if(error instanceof Prisma.PrismaClientKnownRequestError && error.code==='P2002'){
      return c.json({success:false,message:"Author already followed"},403)
    }
    return c.json({success:false,message:"Internal Server Error"},500)
  }
}

export const removeFollowing = async(c:Context)=>{
  try {
    const { followingId } = await c.req.json()
    if(!followingId) return c.json({success:false,message :"invalid data sent"})
    const prisma = await getPrisma(c.env.DATABASE_URL)

    const id = c.get("authorId")

    await prisma.following.delete({
      where : {
        unique_follower_following_constraint : {
          followingId : followingId,
          followerId : id
        }
      }
    })

    return c.json({success : true, message : `Author unfollowed`},200)
  } catch (error) {
    console.log(error)
    if(error instanceof Prisma.PrismaClientKnownRequestError && error.code==='P2025'){
      return c.json({success:false,message:"Author already unfollowed"},403)
    }
    return c.json({success:false,message:"Internal Server Error"},500)
  }
}