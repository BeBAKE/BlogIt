import {z} from "zod"

export const signupSchema = z.object({
  fullname : z.string().min(3).max(100).trim(),
  email : z.string().email().max(100).trim(),
  password : z.string().min(8,{message : "min password length : 8 characters"}).max(13,{message : "max pasword length : 13 characters"})
})

export const signinSchema = z.object({
  email : z.string().email().max(100).trim(),
  password : z.string().min(8,{message : "min password length : 8 characters"}).max(13,{message : "max pasword length : 13 characters"})
})

export const createPostSchema = z.object({
  id : z.string().uuid(),
  summaryTitle : z.string().min(5,{message : "Min length : 5 characters"}).max(100,{message : "Max length : 100 characters"}).trim(),
  summaryBody : z.string().min(15,{message : "Min length : 15 characters"}).max(150,{message : "Max length : 150 characters"}).trim()
})

export const updatePostSchema = z.object({
  title : z.string().min(5,{message : "Min length : 5 characters"}).max(100,{message : "Max length : 100 characters"}).trim().optional(),
  body : z.string().min(15,{message : "Min length : 15 characters"}).max(1000,{message : "Max length : 1000 characters"}).trim().optional()
})


// bookmark schema 
export const createBookmarkSchema = z.object({
  id : z.string().uuid(),
  summaryTitle : z.string().max(85,{message : "Max length : 85 characters"}).trim(),
  summaryBody : z.string().max(130,{message : "Max length : 130 characters"}).trim(),
  authorName : z.string(),
  createdAt : z.string().datetime(),
  authorId : z.string(),
})

export const bookmarkCursorSchema = z.object({
  myCursor : z.string().datetime(),
  myCursorId : z.string().uuid()
}).optional()

export type SigninType = z.infer<typeof signinSchema>

export type SignupType = z.infer<typeof signupSchema>

export type CreatePostType = z.infer<typeof createPostSchema>

export type UpdatePostType = z.infer<typeof updatePostSchema>

// bookmark types
export type CreateBookmark = z.infer<typeof createBookmarkSchema>

export type bookmarkCursor = z.infer<typeof bookmarkCursorSchema>


