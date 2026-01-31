import { Router } from "express"
import { login, register } from "../controllers/authController"

//http://localhost:1234/api/auth
const authRouter = Router()

// Register
authRouter.post("/register", register)


//Login
authRouter.post("/login", login) 


export { authRouter }