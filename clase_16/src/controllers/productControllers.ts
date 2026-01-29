import { Product } from "../models/productModel"
import { Request, Response } from "express"


const getAllProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const product = await Product.find()
        res.json({
            success: true,
            data: product,
            message: "✅ Obteniendo los productos"
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            success: false,
            message: "Error al obtener productos"
        })
    }
}

export { getAllProducts,  }