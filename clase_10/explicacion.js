// const users = [
//     {
//         _id: "c1a8f9c4-8b4f-4c2e-9d5f-1b2e7a3f9a01",
//         name: "Daniel Fernández",
//         username: "danodev",
//         email: "daniel@gmail.com",
//         passwordHash: "$2b$10$XQ1z...hash",
//         age: 26,
//         role: "admin",
//         active: true,
//         verified: true,
//         phone: "+54 9 351 555 1234",
//         address: {
//             street: "Av. Colón 1234",
//             city: "Córdoba",
//             country: "Argentina",
//             zipCode: "5000"
//         },
//         preferences: {
//             theme: "dark",
//             language: "es",
//             notifications: true
//         },
//         loginAttempts: 1,
//         lastLogin: "2026-01-20T18:45:10.234Z",
//         createdAt: "2025-11-02T14:10:00.000Z",
//         updatedAt: "2026-01-20T18:45:10.234Z"
//     },
//     {
//         _id: "f9d2a1e3-0c7e-41f9-bb3c-7e91a4fcb102",
//         name: "María Gómez",
//         username: "mariag",
//         email: "maria.gomez@gmail.com",
//         passwordHash: "$2b$10$YH9k...hash",
//         age: 32,
//         role: "user",
//         active: true,
//         verified: false,
//         phone: "+54 9 11 4444 8899",
//         address: {
//             street: "Calle Falsa 742",
//             city: "Buenos Aires",
//             country: "Argentina",
//             zipCode: "1414"
//         },
//         preferences: {
//             theme: "light",
//             language: "es",
//             notifications: false
//         },
//         loginAttempts: 0,
//         lastLogin: null,
//         createdAt: "2025-09-18T09:22:45.000Z",
//         updatedAt: "2025-12-01T11:05:12.000Z"
//     },
//     {
//         _id: "7a3e6c92-44c8-4e3d-8c8a-9f13d72a4c77",
//         name: "Lucas Pereira",
//         username: "lucasp",
//         email: "lucas.p@gmail.com",
//         passwordHash: "$2b$10$ABcd...hash",
//         age: 29,
//         role: "moderator",
//         active: false,
//         verified: true,
//         phone: null,
//         address: {
//             street: "San Martín 55",
//             city: "Rosario",
//             country: "Argentina",
//             zipCode: "2000"
//         },
//         preferences: {
//             theme: "dark",
//             language: "en",
//             notifications: true
//         },
//         loginAttempts: 5,
//         lastLogin: "2025-12-10T02:14:33.900Z",
//         createdAt: "2024-06-12T17:40:00.000Z",
//         updatedAt: "2025-12-10T02:14:33.900Z"
//     }
// ]


// // 1 - Validar en el front los datos ingresados en el formulario
// // 2 - Validar los datos que llegan al backend
// // 3 - El backend resuelve la respuesta para el front
// // 4 - El front muestra en la UI la respuesta recibida del front



// interface Res {
//     success: boolean,
//     message: string,
//     data?: any
// }
// interface User {
//     _id: string,
//     name: string,
//     username: string,
//     email: string,
//     passwordHash: string,
//     age: number,
//     role: string,
//     active: boolean,
//     verified: boolean,
//     phone: string,
//     address: {
//         street: string,
//         city: string,
//         country: string,
//         zipCode: string
//     }
// }


// const getUserById = (id: string): Res => {

//     if(!id) {
//         return {
//             success: false,
//             message: "Id is required"
//         }
//     }

//     // if(typeof id !== "string") {
//     //     return {
//     //         success: false,
//     //         message: "El id tiene que ser string"
//     //     }
//     // } ya no hace falta de js a ts

//     if(id.length !== 36) {
//         return {
//             success: false,
//             message: "Invalid ID"
//         }
//     }

//     if (id.split("-").length !== 5) {
//         return {
//             success: false,
//             message: "Invalid ID"
            
//         }
//     }
    
    
    
    
//     const user = users.find(user => user._id === id)

//     if(!user) {
//         return {
//             success: false,
//             message: "Usuario no encontrado"
//         }
//     }

//     const response = {
//         success : true,
//         data: user,
//         message: "Found user by id"
//     } 
//     return response
// }
// // c1a8f9c4-8b4f-4c2e-9d5f-1b2e7a3f9a01
// const foundUser = getUserById('c1a8f9c4-8b4f-4c2e-9d5f-1b2e7a3f9a01')

// const createUser = (user: User) => {
//     console.log("Agregando usuarios")
// }


// console.log(foundUser)