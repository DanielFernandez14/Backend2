import { showPassword, credential } from "./variables.js"
import { sumar, sumar2 } from "./arrow-function.js"

const nombre = "Daniel"
const edad = 26

console.log(`Hola soy ${nombre} y tengo ${edad} años de edad`)
const resultado = sumar(10, 20)
const resultado2 = sumar2(10, 30)

const password = showPassword()
console.log(password, `The credential is -> ${credential}`)
console.log(`Resultado de la suma -> ${resultado}`) 
console.log(`El resultado2 es -> ${resultado2}`)
