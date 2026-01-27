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
            messagge: "Movie added successfully ✅"
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
        const films = await Film.find()
        return {
            success: true,
            data: films,
            message: "films successfully recovered ✅"
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}


const getFilm = async (id: string) => {
    try {
        const foundFilm = await Film.findById(id)
        if (!foundFilm) {
            return {
                success: false,
                message: "Film not found ❌"
            }
        }
        return{
            success: true,
            data: foundFilm,
            message: "Film successfully recovered"
        }

    } catch (error: any) {
        return {
            success: true,
            message: " Film not found 2 ❌"
        }
    }
}


const updateFilm = async (id: string, newData: Partial<IFilm>) => {
    try {
        const updateFilm = await Film.findByIdAndUpdate(id, newData, {new: true})
        if(!updateFilm) 
            return {
                success: false, 
                message: "Film not Found ❌"
        } 
        return {
            success: true,
            data: updateFilm,
            message: "movie successfully updated"
        }

    } catch (error: any) {
        return{
            success: false,
            error: error.message
        }
    }
}

const deleteFilm = async (id: string) => {
    try {
        const deletedFilm = await Film.findByIdAndDelete(id)
        if(!deletedFilm) 
            return {
                success: false,
                message: "Film not found ❌"
            }
            return {
                success: true,
                data: deletedFilm,
                message: "Film successfully deleted ✅"
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

const main = async () => {
    connectMongoDB()







// const deleteMovie = await deleteFilm("6978085d4fd314b02ba1a5de")
// console.log(deleteMovie)






    // const updatedFilm = await updateFilm("69780797001a25681273f646", {rating: 8 })
    // console.log(updatedFilm)






    // const film = await getFilm("69780797001a25681273f646")
    // console.log(film)





    // const films = await getFilms()
    // console.log(films)




    // const savedFilm = await addNewFilm({title: "El Man", year: 2012, rating: 7, gender: "acción"})
    // console.log(savedFilm)
}

main()
