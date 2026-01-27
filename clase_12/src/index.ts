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
        const users = await User.find()
        return{
            success: true,
            data: users,
            message: "Obtener todos los usuarios"
        }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            error: e.message
        }
    }
}
const getUserById = async (id: string) => {
    try {
        const user = await User.findById(id)
        if (!user) {
            return {
                success: false,
                message: "Usuario no encontrado"
            }
        }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            error: e.message
        }
    }
}
const createUser = async (newUserData: IUser) => {
    try {
        const {username, password, email} = newUserData
        const newUser = new User({username, password, email})

        await newUser.save()

        return{
            success: true,
            data: newUser,
            message: "Usuario creado con éxito ✅"
        }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            error: e.message
        }
    }
}
const updateUser = async (id: string, data: Partial<IUser>) => {
    try {
        const updateUser = await User.findByIdAndUpdate(id, data, { new: true})
        if(!updateUser) {
            return {
                success: false,
                message: "Usuario no encontrado"
            }
        }

        return{
            success: true,
            message: "Usuario actualizado con éxito ✅"
        }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            error: e.message
        }
    }
}
const deleteUser = async (id: string) => {
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        if (!deleteUser) {
            return {
                success: false,
                message: "Usuario no encontrado"
            }
        }
            return {
                success: true,
                data: deleteUser._id,
                message: "Usuario eliminado con éxito ✅"
            }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            error: e.message
        }
    }
}



const main = async () => {
    connectMongoDb()

    // const user = await deleteUser("69791ef3f0f07a421befb5fd")
    // console.log(user)

    // const user = await updateUser("69791ef3f0f07a421befb5fd", {email: "daniel123@gmail.com"})
    // console.log(user)

    // const user = await createUser({username: "daniel1", password: "daniel1", email: "daniel@gmaila"})
    // console.log(user)

    // const user = await getUserById("asdf")
    // console.log(user)
}

main()





