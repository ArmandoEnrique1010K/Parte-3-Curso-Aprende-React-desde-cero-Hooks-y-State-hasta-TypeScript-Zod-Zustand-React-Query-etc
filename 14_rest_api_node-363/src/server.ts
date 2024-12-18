import express from "express"
import router from "./router"
// Importa el modulo db
import db from "./config/db"

// Instala la libreria de colors.js para cambiar el color de los mensajes que se imprimen en la consola

// Utiliza el comando "npm i colors"

// https://www.npmjs.com/package/colors

// Importa el modulo colors (libreria colors.js)
import colors from 'colors'

/* */

// Define una función para conectar a la base datos, sequelize utiliza promise, recuerda utilizar la sintaxis de async y await
async function connectDB() {
    try {
        // Espera a que se realice la conexión, el metodo authenticate sirve para autenticarse a la base de datos
        await db.authenticate()

        // sync aplica los cambios de forma automatica que se realizaron a la base de datos
        db.sync()

        // Cambia el color del mensaje a un color azul
        // console.log(colors.blue("Conexión exitosa a la BD"))

        // Cambia el color del mensaje a un fondo de color verde y texto en negrita
        console.log(colors.bgGreen.bold("Conexión exitosa a la BD"))


    } catch (error) {
        // Muestra un mensaje de error
        console.log(error)

        // Cambia el color del mensaje a un color de fondo rojo y color de texto blanco
        // console.log(colors.bgRed.white("Hubo un error al conectar a la base de datos"))

        // Cambia el color del mensaje a un color de fondo rojo y texto en negrita
        console.log(colors.red.bold("Hubo un error al conectar a la base de datos"))
    }
}

// Llama a la función connectDB
connectDB()

// Un error comun que suele aparecer al ejecutar "npm run dev", es "SSL/TLS required", se requiere una conexión SSL o TSL. Para solucionarlo, ve al modulo "db.ts"

const server = express();

server.use('/api/products', router)

export default server

/* */

