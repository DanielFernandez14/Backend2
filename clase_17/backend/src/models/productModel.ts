import { Schema, model } from "mongoose"

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            unique: true,
            trim: true,
            minlength: [2, "El nombre debe tener al menos 2 caracteres"],
            maxlength: [60, "El nombre no puede superar los 60 caracteres"]
        },

        price: {
            type: Number,
            required: [true, "El precio es obligatorio"],
            min: [0, "El precio no puede ser negativo"]
        },

        category: {
            type: String,
            required: [true, "La categoría es obligatoria"],
            enum: {
                values: ["almacen", "limpieza"],
                message: "La categoría debe ser 'almacen' o 'limpieza'"
            }
        }
    },
    {
        versionKey: false,
        timestamps: true // createdAt / updatedAt (MUY útil)
    }
)

/**
 * Índices (performance y seguridad)
 * - name unique ya crea índice, esto refuerza intención
 */
productSchema.index({ name: 1 }, { unique: true })
productSchema.index({ category: 1 })

export const Product = model("Product", productSchema)
