import { Hono } from "hono";
import * as blog from "../controller/blog"
import * as bookmark from "../controller/bookmarks"
import { schemaValidator } from "../middleware/zodSchemaValidator"
import { bookmarkCursorSchema } from "@bebake/blogit-common";

const blogsRouter = new Hono<{Bindings : Bindings}>()

// blogs
blogsRouter.get('/post/:id',blog.getBlog)
blogsRouter.get('/bulk/',blog.getAllBlog)
blogsRouter.post("/bulk/published",schemaValidator(bookmarkCursorSchema),blog.getPublished)
blogsRouter.post('/:id',blog.createBlog) 
blogsRouter.delete('/:id',blog.deleteBlog)


//bookmarks
blogsRouter.post('/bookmark/bulk',schemaValidator(bookmarkCursorSchema),bookmark.getAllBookmarks)
blogsRouter.post('/bookmark/:id',bookmark.createBookmark)
blogsRouter.delete('/bookmark/:id',bookmark.removeBookmark)


export default blogsRouter