// para que el objeto no tome como referencia esta variable, se debe hacer referencia mediante la prop .this
// let name = "pepe"



// un objeto es una estructura de datos que contiene propiedades y metodos
const persona = {
    name: "Daniel",
    tienePerros: true,
    nombreDeMascota: "Timmy",
    saludar() {
        return `¡Hola! Soy ${this.name} y mi mascota se llama ${this.nombreDeMascota}.`
    }
}

console.log(persona.saludar())


// console.log(persona.name) // -> nombre de la persona
// console.log(persona.tienePerros)
// console.log(persona.nombreDeMascota)
// console.log(persona.saludar)

const { name, tienePerros, nombreDeMascota, saludar } = persona



const mascota = {
    nombreMascota: "pepino",
    colores: ["rojo", "verde"],
    raza: "Border Collie"
}

const { nombreMascota, colores, raza } = mascota

console.log(nombreDeMascota, "<- nombre de la mascota") 
console.log(colores, "<- colores de la mascota") 
console.log(raza, "<- raza de la mascota") 