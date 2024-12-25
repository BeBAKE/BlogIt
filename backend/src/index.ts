import { Hono } from 'hono'
import { cors } from 'hono/cors'
import indexRouter from './routes/index'
import { auth } from './middleware/auth'

declare module 'hono' {
  interface ContextVariableMap {
    authorId : string
    JWT_SECRET : string,
    authorName : string
  }
}

const app = new Hono<{Bindings : Bindings}>()

app.use('/api/v1/*',cors({
  origin : "https://blogit.projectlive.me",
}))


app.use("/api/v1/blog/*",auth)
app.use("/api/v1/draft/*",auth)
app.use("/api/v1/social/*",auth)


app.route('/api/v1',indexRouter)

app.notFound((c)=>{
  return c.json({success : false,message:"Page not Found"},404)
})

export default app