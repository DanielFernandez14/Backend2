// recibir el input
// procesar el input
// buscar la data en caso de que sea apto y tenga el permiso
// devolverle la data al usuario

import { usuarios } from "./usuarios.js"

const args = process.argv.slice(2)
const accion = args[0]

const toNumberOrNull = (value) => {
    const n = Number(value)
    return Number.isNaN(n) ? null : n
}

const isSkip = (value) => value === "-" || value === undefined

if (accion === "getUsers") {
    console.log(usuarios)

} else if (accion === "getUser") {
    const id = toNumberOrNull(args[1])

    if (id === null) {
        console.log("ID inválido")
    } else {
        const usuario = usuarios.find((u) => u.id === id)
        console.log(usuario ?? "Usuario no encontrado")
    }

} else if (accion === "createUser") {
    // createUser nombre apellido edad email username rol
    const nombre = args[1]
    const apellido = args[2]
    const edad = toNumberOrNull(args[3])
    const email = args[4]
    const username = args[5]
    const rol = args[6]

    if (!nombre || !apellido || edad === null || !email || !username || !rol) {
        console.log("Faltan datos. Uso: createUser nombre apellido edad email username rol")
    } else {
        const newUsuario = {
            id: usuarios.length + 1,
            nombre,
            apellido,
            edad,
            email,
            username,
            rol
        }

        usuarios.push(newUsuario)
        console.log("Usuario creado:")
        console.log(newUsuario)
        console.log("Lista actualizada:")
        console.log(usuarios)
    }

} else if (accion === "updateUser") {
    // updateUser id nombre apellido edad email username rol
    const id = toNumberOrNull(args[1])

    if (id === null) {
        console.log("ID inválido")
    } else {
        const usuarioEncontrado = usuarios.find((u) => u.id === id)

        if (!usuarioEncontrado) {
            console.log("Usuario no encontrado para modificar")
        } else {
            const nombre = args[2]
            const apellido = args[3]
            const edad = args[4]
            const email = args[5]
            const username = args[6]
            const rol = args[7]

            if (!isSkip(nombre)) usuarioEncontrado.nombre = nombre
            if (!isSkip(apellido)) usuarioEncontrado.apellido = apellido
            if (!isSkip(edad)) {
                const edadNum = toNumberOrNull(edad)
                if (edadNum === null) {
                    console.log("Edad inválida")
                    process.exit(1)
                }
                usuarioEncontrado.edad = edadNum
            }
            if (!isSkip(email)) usuarioEncontrado.email = email
            if (!isSkip(username)) usuarioEncontrado.username = username
            if (!isSkip(rol)) usuarioEncontrado.rol = rol

            console.log(usuarioEncontrado, "<-- Usuario Actualizado")
            console.log(usuarios, "<-- Lista Actualizada")
        }
    }

} else if (accion === "deleteUser") {
    // deleteUser id
    const id = toNumberOrNull(args[1])

    if (id === null) {
        console.log("ID inválido")
    } else {
        const index = usuarios.findIndex((u) => u.id === id)

        if (index === -1) {
            console.log("Usuario no encontrado para eliminar")
        } else {
            const usuarioEliminado = usuarios.splice(index, 1)[0]
            console.log(usuarioEliminado, "<-- Usuario Eliminado")
            console.log(usuarios, "<-- Lista Actualizada")
        }
    }

} else {
    console.log("401 Unauthorized")
}
