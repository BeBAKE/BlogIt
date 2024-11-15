import { Hono, Next } from "hono";
import { signin,signup } from "../controller/user";
import { schemaValidator } from "../middleware/zodSchemaValidator";
import { signinSchema , signupSchema } from "@bebake/blogit-common";


const userRouter = new Hono<{Bindings : Bindings}>()

userRouter.post('/signin',schemaValidator(signinSchema),signin)

userRouter.post('/signup',schemaValidator(signupSchema),signup)

export default userRouter