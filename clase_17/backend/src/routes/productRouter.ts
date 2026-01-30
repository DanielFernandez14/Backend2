// src/routes/productRouter.ts
import { Router } from "express"
import {
    addNewProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/productControllers"
import { exportProductsJson } from "../controllers/productControllers"

const productRouter = Router()

// GET /api/products → listar todos
productRouter.get("/", getAllProducts)

// GET /api/products/:id → obtener uno
productRouter.get("/:id", getProductById)

// POST /api/products → crear
productRouter.post("/", addNewProduct)

// PUT /api/products/:id → actualizar
productRouter.put("/:id", updateProduct)

// DELETE /api/products/:id → eliminar
productRouter.delete("/:id", deleteProduct)

//descarga .json
productRouter.get("/export/json", exportProductsJson)
export { productRouter }
