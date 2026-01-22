"use strict";
// Una interfaz funciona como molde 
// Una interfaz en un contrato
Object.defineProperty(exports, "__esModule", { value: true });
const user1 = {
    id: 1,
    firstName: "María",
    lastName: "Pepeina",
    course: "Backend Web",
    rol: "estudiante"
};
const { id, firstName, lastName, course } = user1;
console.log(`Hola soy ${firstName} ${lastName} y participo en el curso de ${course}`);
const idUser2 = 2;
const firstName2 = "Pablo";
const lastName2 = "papabñp";
const course2 = "frontenddd";
const rol2 = "tutor";
const crearUsuario = (id, firstName, lastName, course, rol) => {
    //usar los parametros para crear el usuario
    const newUser = { id, firstName, lastName, course };
    return newUser;
};
//los argumentos son los datos pasados a la funcion 
//# sourceMappingURL=index.js.map