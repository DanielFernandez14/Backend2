// ricibir el input
//procesar el input
//buscar la data en caso de que sea apto y tenga el permiso
// devolverle la data al usuario

//pedirle al usuario que indique que si quiere la lista de usuarios debe indicarlo mediante el comando "getUsers"
//validar credenciales


import { usuarios } from "./usuarios.js"



const argumentos = process.argv.slice(2)
// console.log(argumentos)

if (argumentos[0] === "getUsers") {
    console.log(usuarios)
} else if(argumentos[0] === "getUser") {
    const usuario = usuarios.find((u) => u.id === Number(argumentos[1]))
    console.log(usuario)

} else if (argumentos[0] === "createUser"){
    const newUsuario = {
        id: usuarios.length + 1,
        nombre: argumentos[2],
        apellido: argumentos[3],
        edad: argumentos[4],
        email: argumentos[5],
        username: argumentos[6],
        rol: argumentos[7]
    }
    usuarios.push(newUsuario)
    
} else if (argumentos[0] === "updateUser"){
    const id = Number(argumentos[1])
    const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id)

    if(usuarioEncontrado === undefined ){
        console.log("Usuario no encontrado para modificar")
    } else {
        const nombre = argumentos[2]
        const apellido = argumentos[3]
        const edad = argumentos[4]
        const email = argumentos[5]
        const username = argumentos[6]
        const rol = argumentos[7]

        // console.log(nombre, "<- nombre")
        // console.log(apellido, "<- apellido")
        // console.log(edad, "<- edad")
        // console.log(email, "<- email")
        // console.log(username, "<- username")
        // console.log(rol, "<- rol")
    
        if (nombre !== "-") {
        usuarioEncontrado.nombre = nombre
        } 
        if (apellido !== "-") {
            usuarioEncontrado.apellido = apellido
        }
        if (edad !== "-") {
            usuarioEncontrado.edad = edad
        }
        if (email !== "-") {
            usuarioEncontrado.email = email
        }
        if (username !== "-") {
            usuarioEncontrado.username = username
        }
        if (rol !== "-") {
            usuarioEncontrado.rol = rol
        }
    
    console.log(usuarioEncontrado, "<-- Usuario Actualizado") 
    console.log(usuarios, "<-- Lista Actualizada")
}
} else if (argumentos[0] === "deleteUser") {
    const id = Number(argumentos[1])

    const index = usuarios.findIndex((u) => u.id === id)

    if (index === -1) {
        console.log("Usuario no encontrado para eliminar")
    } else {
        const usuarioEliminado = usuarios.splice(index, 1)[0]

        console.log(usuarios, "<-- Lista Actualizada")
        console.log(usuarioEliminado, "<-- Usuario Eliminado")
    }
}




else {
    console.log("401 Unauthorized")
}

