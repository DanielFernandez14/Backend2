import { connectDB } from "./config/mongo"
import { Schema, model } from "mongoose"




// Esquema = molde -> forma de validar los datos que enviamos a mongodb
// es decir un usuario deberia tener: name, email, age



connectDB()



const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true}
},
{
    versionKey: false
})

const User = model("User", userSchema)

// el modelo sirve también para validar nuestras peticiones

const createUser = (name: string, email: string, age: number) => {
    const user = new User({ name, email, age })
    user.save()
    console.log("Usuario creado con éxito ✅", user)
}

const getUsers = async () => {
    const users = await User.find()
    console.log(users)
}

const deleteUser = async (id: string) => {
    const deleteUser = await User.findByIdAndDelete(id)
    console.log(deleteUser)
}


interface DataUser {name: string; email: string; age: number}
const updateUser = async (id: string, data: Partial<DataUser>) => {
    const updateUser = await User.findByIdAndUpdate(id, data, {new: true})
    console.log(updateUser)
}
updateUser("69769d645785d6c8e91a2a40", {age: 29})




// (deleteUser("69769db6c5756cfa9f2ed51f"))

// getUsers()

// createUser("Daniel Fernandez", "ss@gmail.com", 26)
