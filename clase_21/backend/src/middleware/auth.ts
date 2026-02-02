import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

process.loadEnvFile()

// Analizar el token: -> para analizar de que existe, para analizar si es valido (clave secreta),
// para analizar si no está vencido (tiempo de expiración)

const protect = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const header = req.headers.authorization
    const token = header?.split(" ")[1]
    console.log(token, "<-- TOKEN")

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "token is required",
        })
    }

    if (token.endsWith("token")) {
        return res.status(401).json({
            success: false,
            message: "token is required",
        })
    }

    const secretKey = process.env.JWT_SECRET!

    // VALIDAR TOKEN
    try {
        const decode = jwt.verify(token, secretKey)
        console.log(decode)

        console.log("Podes pasar")
        next()
    } catch (error: any) {
        if (error?.name === "JsonWebTokenError" && error?.message === "invalid signature") {
            return res.status(401).json({
                success: false,
                message: "Invalid secret key",
            })
        }

        if (error?.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Jsonwebtoken expired",
            })
        }

        return res.status(401).json({
            success: false,
            message: "Invalid token",
        })
    }
}

export { protect }
