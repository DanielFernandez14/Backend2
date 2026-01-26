import mongoose from 'mongoose'
import { Schema, model, connect } from 'mongoose'

process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""


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
})

const Film = model("film", filmSchema)

const addNewFilm = async () => {
    try {
        
    } catch (error) {
        
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


connectMongoDB()

