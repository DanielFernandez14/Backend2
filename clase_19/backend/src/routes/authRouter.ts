import { Router } from "express"
import { login, register } from "../controllers/authController"

//http://localhost:1234/api/auth
const authRouter = Router()

// Register
//http://localhost:1234/api/auth/register en database
authRouter.post("/register", register)


//Login
//http://localhost:1234/api/auth/login en database
authRouter.post("/login", login) 


export { authRouter }