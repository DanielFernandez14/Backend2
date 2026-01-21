// ricibir el input
//procesar el input
//buscar la data en caso de que sea apto y tenga el permiso
// devolverle la data al usuario

//pedirle al usuario que indique que si quiere la lista de usuarios debe indicarlo mediante el comando "getUsers"
//validar credenciales


import { usuarios } from "./usuarios.js"



const argumentos = process.argv.slice(2)
console.log(argumentos)

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
        rol: argumentos[9]
    }
    usuarios.push(newUsuario)
    
} else {
    console.log("401 Unauthorized")
}