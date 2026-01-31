// src/controllers/productControllers.ts
import type { Request, Response } from "express"
import { Product } from "../models/productModel"

/**
 * Helpers
 */
const sendError = (
    res: Response,
    status: number,
    message: string,
    details?: unknown
) => {
    return res.status(status).json({
        success: false,
        message,
        ...(details ? { details } : {})
    })
}

// Normaliza strings (evita espacios raros)
const normalizeString = (value: unknown) => {
    return String(value ?? "").trim()
}

// Validación/sanitización mínima (la real siempre en backend)
const validateProductBody = (body: any) => {
    const name = normalizeString(body?.name)
    const category = normalizeString(body?.category).toLowerCase()
    const priceRaw = body?.price

    // name
    if (!name) {
        return { ok: false as const, message: "El campo 'name' es requerido." }
    }

    if (name.length < 2 || name.length > 60) {
        return {
            ok: false as const,
            message: "El campo 'name' debe tener entre 2 y 60 caracteres."
        }
    }

    // category (según tu enum)
    const allowedCategories = ["almacen", "limpieza"]

    if (!category) {
        return { ok: false as const, message: "El campo 'category' es requerido." }
    }

    if (!allowedCategories.includes(category)) {
        return {
            ok: false as const,
            message: `Categoría inválida. Debe ser una de: ${allowedCategories.join(", ")}.`
        }
    }

    // price (modelo PRO: Number)
    const priceNum =
        typeof priceRaw === "number"
            ? priceRaw
            : Number(normalizeString(priceRaw).replace(",", "."))

    if (!Number.isFinite(priceNum) || priceNum < 0) {
        return {
            ok: false as const,
            message: "El campo 'price' debe ser un número válido (>= 0)."
        }
    }

    // ✅ ahora price es number (coincide con productModel.ts donde price: Number)
    return {
        ok: true as const,
        data: { name, price: priceNum, category }
    }
}

const isValidObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id)

/**
 * GET /api/products
 * Lista productos
 */
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })

        return res.json({
            success: true,
            data: products,
            message: "✅ Obteniendo los productos"
        })
    } catch (error: any) {
        console.error("getAllProducts error:", error)
        return sendError(res, 500, "Error al obtener productos")
    }
}

/**
 * POST /api/products
 * Crea un producto
 */
export const addNewProduct = async (req: Request, res: Response) => {
    try {
        const validation = validateProductBody(req.body)

        if (!validation.ok) {
            return sendError(res, 400, validation.message)
        }

        const created = await Product.create(validation.data)

        return res.status(201).json({
            success: true,
            message: "✅ Producto agregado con éxito",
            data: created
        })
    } catch (error: any) {
        console.error("addNewProduct error:", error)

        // Duplicado (unique) -> Mongo error code 11000
        if (error?.code === 11000) {
            const dupField = Object.keys(error?.keyPattern || {})[0] || "campo"
            return sendError(res, 409, `Ya existe un producto con ese ${dupField} (unique).`)
        }

        // Error de validación de Mongoose
        if (error?.name === "ValidationError") {
            return sendError(res, 400, error.message)
        }

        // CastError (por ejemplo ObjectId mal formateado en algún caso)
        if (error?.name === "CastError") {
            return sendError(res, 400, "Datos inválidos (CastError).")
        }

        return sendError(res, 500, "❌ Error al crear producto")
    }
}

/**
 * PUT /api/products/:id
 * Actualiza un producto
 */
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = normalizeString(req.params.id)

        if (!isValidObjectId(id)) {
            return sendError(res, 400, "ID inválido.")
        }

        const validation = validateProductBody(req.body)

        if (!validation.ok) {
            return sendError(res, 400, validation.message)
        }

        const updated = await Product.findByIdAndUpdate(id, validation.data, {
            new: true,
            runValidators: true
        })

        if (!updated) {
            return sendError(res, 404, "Producto no encontrado.")
        }

        return res.json({
            success: true,
            message: "✅ Producto actualizado con éxito",
            data: updated
        })
    } catch (error: any) {
        console.error("updateProduct error:", error)

        if (error?.code === 11000) {
            const dupField = Object.keys(error?.keyPattern || {})[0] || "campo"
            return sendError(res, 409, `Ya existe un producto con ese ${dupField} (unique).`)
        }

        if (error?.name === "ValidationError") {
            return sendError(res, 400, error.message)
        }

        if (error?.name === "CastError") {
            return sendError(res, 400, "Datos inválidos (CastError).")
        }

        return sendError(res, 500, "❌ Error al actualizar producto")
    }
}

/**
 * DELETE /api/products/:id
 * Elimina un producto
 */
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = normalizeString(req.params.id)

        if (!isValidObjectId(id)) {
            return sendError(res, 400, "ID inválido.")
        }

        const deleted = await Product.findByIdAndDelete(id)

        if (!deleted) {
            return sendError(res, 404, "Producto no encontrado.")
        }

        return res.json({
            success: true,
            message: "✅ Producto eliminado con éxito",
            data: deleted
        })
    } catch (error: any) {
        console.error("deleteProduct error:", error)

        if (error?.name === "CastError") {
            return sendError(res, 400, "ID inválido (CastError).")
        }

        return sendError(res, 500, "❌ Error al eliminar producto")
    }
}

/**
 * GET /api/products/:id
 * Obtiene un producto por ID (útil para CRUD real)
 */
export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = normalizeString(req.params.id)

        if (!isValidObjectId(id)) {
            return sendError(res, 400, "ID inválido.")
        }

        const product = await Product.findById(id)

        if (!product) {
            return sendError(res, 404, "Producto no encontrado.")
        }

        return res.json({
            success: true,
            data: product,
            message: "✅ Producto encontrado"
        })
    } catch (error: any) {
        console.error("getProductById error:", error)

        if (error?.name === "CastError") {
            return sendError(res, 400, "ID inválido (CastError).")
        }

        return sendError(res, 500, "Error al obtener el producto")
    }
}

export const exportProductsJson = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().lean()

        const limpieza = products.filter((p: any) => p.category === "limpieza")
        const almacen = products.filter((p: any) => p.category === "almacen")

        const backup = {
            meta: {
                exportedAt: new Date().toISOString(),
                total: products.length,
                limpieza: limpieza.length,
                almacen: almacen.length
            },
            categories: {
                limpieza,
                almacen
            }
        }

        const date = new Date().toISOString().slice(0, 10)
        const filename = `products-backup-${date}.json`

        res.setHeader("Content-Type", "application/json; charset=utf-8")
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`)

        return res.status(200).send(JSON.stringify(backup, null, 4))
    } catch (error: any) {
        console.error("exportProductsJson error:", error)
        return res.status(500).json({
            success: false,
            message: "Error al exportar productos"
        })
    }
}

