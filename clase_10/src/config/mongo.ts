import { connect } from "mongoose"

process.loadEnvFile()


const connectDB = async () => {
    try {
        const URI_DB = process.env.URI_DB || ""
        await connect(URI_DB)
        console.log("Conectado exitosamente a MongoDB ✅")
    } catch (error) {
        console.log("No se puede conectar a MongoDB ❌")
    }
}

export { connectDB }
