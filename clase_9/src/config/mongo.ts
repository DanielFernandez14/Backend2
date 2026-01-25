import mongoose from "mongoose"

const connectDB = async ( ) => {
    await mongoose.connect("mongodb://localhost:27017/utn-backend")
    console.log("Conectado a MongoDb con Éxito ✅")
}

export { connectDB }


