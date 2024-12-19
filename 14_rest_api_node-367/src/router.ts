import { Router } from "express"
import { createProduct } from "./handlers/product";

const router = Router();

router.get('/', (req, res) => {
  res.json('Desde GET')
})

// Crea una carpeta llamada handlers en la carpeta src y luego crea el archivo product.ts para definir las pequeñas funciones para definir la funcionalidad 

// router.post('/', (req, res) => {
//     res.json('Desde POST')
// })

// Al llamar a la función createProduct no coloques parentesis
router.post('/', createProduct)

// Prueba enviando una petición de tipo POST a la URL http://localhost:4000/api/products desde Postman o ThunderClient

// Recuerda que en el modulo server.ts se tiene una URL global


router.put('/', (req, res) => {
  res.json('Desde PUT')
})

router.patch('/', (req, res) => {
  res.json('Desde PATCH')
})

router.delete('/', (req, res) => {
  res.json('Desde DELETE')
})

export default router

/* */

// ENDPOINTS

// Obtener productos (GET) ---> /products
// Obtener producto (GET) ---> /products/10
// Crear producto (POST) ---> /products/10
// Editar producto (PUT/PATCH) ---> /products/10
// Borrar producto (DELETE) ---> /products/10

/* */

// COLECCIONES EN THUNDERCLIENT

// Puedes abrir thunderclient, ve a la pestaña "Collections", clic en el icono de menú, selecciona "New collection", escribe el nombre "REST API - Node y TypeScript"

// Puedes colocar un request (petición) dentro de un collection, haz clic en el menu de configuraciones de un request y selecciona "Save to Collection", selecciona el nombre de la colección y escribe el nombre del request "POST - Crear Producto", pulsa Submit para guardarlo

// Abre la colección creada y se puede ver el endpoint que fue guardado

/* */

// Antes de realizar una petición de tipo POST a:
// http://localhost:4000/api/products

// Ve a la pestaña "Body" y escribe un objeto JSON con la información

/*
{
  "name": "Monitor Curvo 34 Pulgadas",
  "price": 300,
  "availability": true
}
*/

// Se simula que esos datos estan en un formulario, se recuperan y se envian por via axios, actualmente esta con ThunderClient

// Realiza una configuración en server.ts

// Ahora puedes ver en la consola que imprime el objeto que fue enviado a la base de datos
// { name: 'Monitor Curvo 34 Pulgadas', price: 300, availability: true }

/* */

// Una vez que hayas establecido un valor por defecto en el model Product para la propiedad availability, intenta enviar un objeto JSON sin la propiedad availability

/*
{
  "name": "Monitor Curvo 34 Pulgadas",
  "price": 300
}
*/

// En Dbeaver, puedes hacer clic derecho en la tabla y seleccionar "refresh" para actualizar los cambios realizados


