// Importa una instancia de Router de express
import { Router } from "express"

// Llama a la función Router, para tener acceso a las funciones del Router de express
const router = Router();

// Define aqui las rutas del servidor (puedes copiar y pegarlo desde server.ts, pero reemplaza "server" por "router")

router.get('/', (req, res) => {
    res.json('Desde GET')
})

router.post('/', (req, res) => {
    res.json('Desde POST')
})

router.put('/', (req, res) => {
    res.json('Desde PUT')
})

router.patch('/', (req, res) => {
    res.json('Desde PATCH')
})

router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})

// Exporta por defecto router
export default router