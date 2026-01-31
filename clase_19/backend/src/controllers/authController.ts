import { Request, Response } from "express"
import bcryptjs from "bcryptjs"
import { Auth } from "../models/authModel"

interface User {
    username: string,
    email: string,
    password: string
}


const register = async (req: Request, res: Response): Promise<any>  => {
    try {
        console.log("✅ PEGÓ REGISTER", req.body)

        const body = req.body
        const {username, email, password}: User = body
        
        // hashear la constraseña
        const hash = await bcryptjs.hash(password, 10)

        const newDataUser = {
            username,
            email,
            password: hash
        }
        const newUser = new Auth(newDataUser)
        await newUser.save()
        
        res.status(201).json({
            success: true,
            message: "Usuario creado con éxito",
            data: newUser
        })


    } catch (error) {
        const err = error as Error
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}





const login = async (req: Request, res: Response): Promise<any>  => {
    try {
        
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export { register, login }