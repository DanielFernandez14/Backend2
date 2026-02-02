import express from "express"
import { connectDb } from "./config/connectMongoDb"

import { productRouter } from "./routes/productRouter"
import { authRouter } from "./routes/authRouter"

import cors from "cors"
import { protect } from "./middleware/auth"

process.loadEnvFile()

const PORT = process.env.PORT || 3000

//express permite utilizar el cuerpo de la petición
const app = express()
app.use(express.json())
//cors permite que el frontend haga uso del back
app.use(cors())


// auth -> authorization
app.use("/api/auth", authRouter)


//antes de acceder a los productos pedir permiso
// un middleware -> una funcion que se ejecuta en el medio de la petición
app.use("/api/products", protect, productRouter)

app.listen(PORT, () => {
  console.log(`✅ Servidor HTTP en funcionamiento en el puerto ${PORT}.`)
  connectDb()
})