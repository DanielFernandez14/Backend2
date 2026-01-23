// crear un usuario 
// obtener usuarios
// borrar usuarios

import fileSystem, { read } from "node:fs"
import crypto from "node:crypto"

const readDataBase = () => {
    const dataInBaffer = fileSystem.readFileSync("./users.json", "utf-8")
    const users = JSON.parse(dataInBaffer)
    return users
}

const writeDataBase = (newData: any) => {
    

    fileSystem.writeFileSync("./users.json", JSON.stringify(newData, null, 4))
    return "Base de datos actualizada"
}

const createUser = (name: string, password: string) => {
    const newUser = {
        id: crypto.randomUUID(),
        name,
        password
    }

    const users = readDataBase()

    // Lista de usuarios en su ultima version (con el usuario creado agregado)
    users.push(newUser)

    writeDataBase(users)
    
    console.log("Usuario creado con éxito")
    
    return newUser
}

const getUsers = () => {
    return readDataBase()
}

const deleteUser = (id: string) => {
    const users = readDataBase()

    const foundUser = users.find((user: any) => user.id !== id)

    if(foundUser === undefined) {
        return "Usuario no encontrado"
    }

    const newUsers = users.filter((user: any) => user.id !== id)   
    writeDataBase(newUsers)
    return "Usuario borrado con exito"
}
// console.log(writeDataBase([{name: "soy un nuevo usuario 1"}]))
// console.log(createUser("dadadada", "asdfasdfasdf"))
// console.log(getUsers())
console.log(deleteUser("c1a6f0d8-3b4a-4e9c-9f2d-7a8c6e5b1d90"))