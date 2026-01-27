import { connect, Schema, model } from 'mongoose'

process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""



const connectMongoDb = async () => {
    try {
        await connect(URI_DB)
        console.log("✅ Conectado a MongoDB con éxito ")
    } catch (error) {
        console.log("❌ Error al conectarse a MongoDB")
    }
}



const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true}
},{
    versionKey: false
})

const User = model("User", userSchema)

interface IUser {
    username: string,
    password: string,
    email: string
}


const getAllUser = async () => {
    try {
        
    } catch (error: any) {
        
    }
}
const getUserById = async (id: string) => {
    try {
        
    } catch (error) {
        
    }
}
const createUser = async (newUserSchema: IUser) => {
    try {
        
    } catch (error: any) {
        
    }
}
const updateUser = async (id: string, data: Partial<IUser>) => {
    try {
        
    } catch (error: any) {
        
    }
}
const deleteUser = async (id: string) => {
    try {
        
    } catch (error:any) {
        
    }
}



const main = async () => {
    connectMongoDb()


}

main()





