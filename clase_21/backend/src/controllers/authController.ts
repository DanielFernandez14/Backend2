import { Request, Response } from "express";
import bcryptjs from "bcryptjs"
import { Auth } from "../models/authModel";
import jwt from "jsonwebtoken"

process.loadEnvFile()


interface User {
  username: string
  email: string
  password: string
}

const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body
    const { username, email, password }: User = body

    // hashear la contraseña
    const hash = await bcryptjs.hash(password, 10)

    const newDataUser = { username, email, password: hash }

    const newUser = new Auth(newDataUser)
    await newUser.save()

    res.status(201).json({
      success: true,
      message: "usuario creado con éxito",
      data: { _id: newUser._id, username: newDataUser.username, email: newDataUser.email }
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body
    const { email, password }: Partial<User> = body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "data invalida"
      })
    }

    const user = await Auth.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, message: "unathorized" })
    }

    const validatePassword = await bcryptjs.compare(password, user.password)

    if (!validatePassword) {
      return res.status(401).json({ success: false, message: "unathorized" })
    }

    // Generar una credencial que permita el acceso a los productos
    // TOKEN -> credencial 
    // Necesitamos el Payload -> la info del usuario logueado 
    // Clase secreta -> clave que valida mi token
    // Tiempo de expiración -> Cuánto tiempo nos da el servidor para acceder a los productos en este caso, desde un minuto a un año por ejemplo. ---->> || Es la sesión ||
    // Lo ponemos en la función login porque ya sabemos cual es el usuario logueado

    const payload = {_id: user._id, username: user.username}
    const secretKey = process.env.JWT_SECRET as string
    const expiration = {expiresIn: "1m"}

    const token = jwt.sign(payload, secretKey, { expiresIn: "1m"})



    res.json({
      success: true,
      message: "usuario logueado",
      token
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export { register, login }