import { recetas } from "./recipes.js"

const nombre = process.argv.slice(2).join(" ")

console.log(nombre, "<- nombre de la receta")

const foundRecipe = recetas.find(
    receta => receta.nombre.toLowerCase() === nombre.toLowerCase()
)

console.log(foundRecipe ?? "Receta no encontrada")
