// Diferencia entre persistencia de datos y procesamiento de datos

import * as fileSystem from "node:fs"
import crypto from "node:crypto"

const sumar = (n1: number, n2: number) => {
    let result: number = n1 + n2

    return result
}

const suma = sumar(1, 2)
console.log(suma, "<- resultado de la suma")

// En sistemas hay dos tipos de memoria
// Disco duro -> la info persiste
// Ram -> Memoria reservada para procesos

const colores = ["azul", "rojo", "amarillo"]



// console.log(colores)


// Sincronico -> esperar a que termine
// Asincronico -> continua, te aviso cuando termine

const data = fileSystem.readFileSync("./colores.json", "utf-8")

const parsedData = JSON.parse(data)

parsedData.push("violeta")

fileSystem.writeFileSync("./colores.json", JSON.stringify(parsedData))
console.log(parsedData)
