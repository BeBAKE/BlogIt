import { Hono } from "hono";
import * as blog from "../controller/blog"
import * as bookmark from "../controller/bookmarks"
import { schemaValidator } from "../middleware/zodSchemaValidator"
import { updatePostSchema,bookmarkCursorSchema } from "@bebake/blogit-common";

const blogsRouter = new Hono<{Bindings : Bindings}>()

// blogs
// blogsRouter.post('/',schemaValidator(createPostSchema),blog.createBlog)
blogsRouter.get('/post/:id',blog.getBlog)
blogsRouter.get('/bulk/',blog.getAllBlog)
// blogsRouter.put('/:id',schemaValidator(updatePostSchema),blog.updateBlog)
blogsRouter.post('/:id',blog.createBlog) // add schema validation // currently empty title or body causes error in deltaToText


//bookmarks
// blogsRouter.get('/bookmark/post/:id',bookmark.getBookmark)
blogsRouter.post('/bookmark/bulk',schemaValidator(bookmarkCursorSchema),bookmark.getAllBookmarks)
blogsRouter.post('/bookmark/:id',bookmark.createBookmark)
blogsRouter.delete('/bookmark/:id',bookmark.removeBookmark)


export default blogsRouter