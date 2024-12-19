import express from "express"
import router from "./router"
import db from "./config/db"
import colors from 'colors'

async function connectDB() {
    try {
        await db.authenticate()

        db.sync()

        console.log(colors.bgGreen.bold("Conexión exitosa a la BD"))

    } catch (error) {
        console.log(error)

        console.log(colors.red.bold("Hubo un error al conectar a la base de datos"))
    }
}

connectDB()

// Instancia de express
const server = express();

// Leer datos de formulario
// use se utiliza en todos los request, express.json habilita la lectura de JSON, por lo cual puedes enviar un objeto JSON a una URL de tipo POST
server.use(express.json())

server.use('/api/products', router)

export default server

