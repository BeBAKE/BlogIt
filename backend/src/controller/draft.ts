import { Context } from "hono"
import getPrisma from "../db"
import { DeltaToText, deltaToText } from "../misc/DeltaToText"

//update and create draft are using websocket

export const getAllDrafts = async(c : Context)=>{
  try {
    const prisma = await getPrisma(c.env.DATABASE_URL)
    const authorId = c.get("authorId")
    const draft = await prisma.draft.findMany({
      where : {
        authorId : authorId
      },
      orderBy : {
        createdAt : "desc"
      },
      select : {
        id : true,
        title : true,
        createdAt : true
      }
    })
    // console.log(draft[2].title)
    
    const plainTitleArray = draft.map((e)=>{
      if(e.title==="") return {...e,title : ""}
      const title = JSON.parse(JSON.stringify(e.title))     
      return {...e,title : (deltaToText(title as DeltaToText,"title"))}
    }) 

    return c.json({success : true, data : plainTitleArray },200)

  } catch (error) {
    console.log(error)
    return c.json({success : false, message : "Internal Server Error"},500)
  }
}


export const deleteDraft = async(c:Context)=>{
  try {
    const prisma = await getPrisma(c.env.DATABASE_URL)
    const { id } = c.req.param()
    if(!id) {
      return c.json({success : false,message : "No valid identifier provided for the draft"},400)
    }
    const draft = await prisma.draft.delete({
      where : {
        id : id
      }
    })
    return c.json({success : true, message : "draft deleted"},200)

  } catch (error:any) {
    if(error.code==='P2025') return c.json({success : false,message : "No draft found"},404)
    return c.json({success : false, message : "Internal Server Error"},500)
  }
}