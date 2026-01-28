import express from "express"
import { Schema, model } from "mongoose"
import { connectMongoDB } from "./config/mongo"
import cors from "cors"


process.loadEnvFile()

const PORT = process.env.PORT


const booksSchema = new Schema({
    title: {type: String, required: true, unique: true},
    author: {type: String, required: true},
    year: {type: Number, required: true}
})

const book = model("Book", booksSchema)

const app = express()
app.use(cors())

const getAllBooks = async () => {
    
}

// http://localhost:1235/api/book
app.get("/api/books", async (request, response): Promise<any> => {
    try {
        const books = await book.find()
        return response.json ({
            success: true,
            data: books,
            message: "Obteniendo todos los libros"
        })
    } catch (error) {
        const err = error as Error
        return response.json ({
            success: false,
            message: err.message
        })
    }
})

app.listen(PORT, () => {
    console.log(`✅ Servidor en escucha en el puerto http://localhost: ${PORT}`)

    connectMongoDB()
})
