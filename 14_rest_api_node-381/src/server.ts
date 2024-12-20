import express from "express"
import router from "./router"
import db from "./config/db"
import colors from 'colors'

async function connectDB() {
    try {
        await db.authenticate()

        db.sync()

        // Comenta este mensaje
        // console.log(colors.bgGreen.bold("Conexión exitosa a la BD"))

    } catch (error) {
        console.log(error)

        console.log(colors.red.bold("Hubo un error al conectar a la base de datos"))
    }
}

connectDB()

const server = express();

server.use(express.json())

server.use('/api/products', router)

// Crea un nuevo endpoint "/api" para mostrar un mensaje en el response (respuesta)
server.get('/api', (req, res) => {
    res.json({ msg: 'Desde API' })
})


export default server

