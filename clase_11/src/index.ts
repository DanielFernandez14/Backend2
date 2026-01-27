import mongoose from 'mongoose'
import { Schema, model, connect } from 'mongoose'

process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""

interface IFilm{
    title: string,
    year: number,
    rating: number,
    gender: string
}

const connectMongoDB = async () =>  {
    try {
        await connect(URI_DB)
        console.log("Conectado con exito a MongoDB ✅")
    } catch (error) {
        console.log("Error al conectar a MongoDB ❌")
    }
}

const filmSchema = new Schema ({
    title: {type: String, required: true, unique: true},
    year: {type: Number, required: true},
    rating: {type: Number, required: true},
    gender: {type: String, required: true}  
    }, {
        versionKey: false
    }
)

const Film = model("film", filmSchema)

const addNewFilm = async (newFilm: IFilm) => {
    try {
        const {title, year, rating, gender } = newFilm
        if(!title || !year || !rating || !gender) {
            return {success: false, error: "Invalid data"}
        }

        const newFileToDB = new Film ({ title, year, rating, gender})
        await newFileToDB.save()
        return {
            success: true,
            data: newFileToDB,
            messagge: "Movie added successfully"
        }
    } catch (error: any) {
        return{
            success: true,
            error: error.message
        }
    }
}

const getFilms = async () => {
    try {
        
    } catch (error) {
        
    }
}

const getFilm = async (id: string) => {
    try {
        
    } catch (error) {
        
    }
}


const updateFilm = async (id: string) => {
    try {
        
    } catch (error) {
        
    }
}

const deleteFilm = async (id: string) => {
    try {
        
    } catch (error) {
        
    }
}

const main = async () => {
    connectMongoDB()

    const savedFilm = await addNewFilm({title: "El Man", year: 2012, rating: 7, gender: "acción"})
    console.log(savedFilm)
}

main()
