import {Schema, model} from "mongoose"
import { connectDB } from "../config/mongo";
import { create } from "node:domain";

interface Book{
    title: string,
    releasedYear: number,
    rating?: number
}
// query consulta -> peticion -> queryres -> respuesta de peticion 
interface QueryRes {
    success: boolean
    message: string
    data?: Book | Book[]
}


const booksSchema  = new Schema({
    title: {type: String, required: true, unique: true},
    releasedYear: {type: Number, required: true},
    rating: {type: Number, required: true, default: 0}
}, {
    versionKey: false
})

const Book = model("Book", booksSchema)

const createRes =(success: boolean, message: string, data?: Book | Book[]) => {
    return data? {
        success,
        message,
        data
    } : {
        success,
        message
    }
}

const getBooks = async () => {
    try {
        const books = await Book.find()
        return createRes(true, "get all books", books)
    } catch (error: any)
        {
            return createRes(false, "Error getting Books ❌")
    }
    }


const getBookById = async (id: string) => {
    try {
        const foundBook = await Book.findById(id)
        if (!foundBook) {
        return createRes(false, "error to find book")
    }
    return createRes(true, "Found book by id ✅", foundBook)
    } catch (error: any) {
        return createRes(false, error.message)
    }
}


const createBook = async (book: Book): Promise<QueryRes> => {
    try {
        const newBook = new Book(book)
        const addedBook = await newBook.save()
        return createRes(true, "Libro agegado correctamente ✅", addedBook) 
    } catch (error) {
        console.error("Error real al agregar libro:", error)
        return {
            success: false,
            message: "Error al agregar libro ❌"
        }
    }
}


const updateBook = async (id: string, dataBook: Partial<Book>) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, dataBook, {new: true})
        if(!updatedBook) {
            return createRes(false, "error updating the book")
        }
        return createRes(true, "book updated successfully", updatedBook as Book)
    } catch (error: any) {
        return createRes(false, error.message)
    }
}


const deleteBook = async (id: string) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(id)
        if (!deletedBook) {
        return createRes(false, "error to delete book")
    }
    return createRes(true, "book successfully deleted")
    } catch (error) {
        return {
            success: false,
            message: "Error al eliminar libro ❌"
        }
    }
}


const main = async () => {
    await connectDB()

    const res = await updateBook(
        "6976d6d7d22a68a5ac11028b",
        { rating: 9 }
    )

    console.log(res)
}

main()

