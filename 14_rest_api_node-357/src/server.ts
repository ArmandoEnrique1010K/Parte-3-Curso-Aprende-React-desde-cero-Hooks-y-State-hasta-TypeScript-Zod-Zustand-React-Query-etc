// Importa express
import express from "express";
import router from "./router";

// Llama a la función express en una constante
const server = express();

// Routing en express

// En este caso, se define la pagina principal (con el metodo get), contiene el endpoint y un callback con 2 parametros: 

// req (lo que se envia como datos de un formulario o un API key)

// res (respuesta obtenida al visitar la pagina como una consulta a la base de datos)

// server.get('/', (req, res) => {

// Puedes escribir codigo JavaScript
// const auth = true
// const datos = [
//     { id: 1, nombre: "Juan" },
//     { id: 2, nombre: "Pablo" }
// ]

// En el response se tiene el metodo send para enviar el contenido, en este caso un String
// res.send("Hola mundo en Express")

// Imprime el valor de una constante
// res.send(auth)
// res.send(datos)

// send es una forma de enviar datos hacia la pantalla, tambien puedes utilizar el metodo json para retornar cualquier información
// res.json(datos)

//     res.json('Desde GET')
// })

// Ingresa a la URL: http://localhost:4000/ (puerto 4000 esta definido en index.ts)

// Aparte del metodo GET, se tiene diferentes metodos HTTP: POST, PUT, PATCH y DELETE

/*
server.post('/', (req, res) => {
    res.json('Desde POST')
})

server.put('/', (req, res) => {
    res.json('Desde POST')
})

server.patch('/', (req, res) => {
    res.json('Desde POST')
})

server.delete('/', (req, res) => {
    res.json('Desde POST')
})
*/

// Normalmente siempre se envia una petición de tipo GET cuando visitas una URL en el navegador, tratas de obtener datos

// Para probar los demás metodos puedes utilizar fetch API o axios.

// Los navegadores soportan 2 metodos HTTP: GET y POST, este ultimo lo soporta cuando defines un formulario
// <form action="/" method="POST"></form>

// POSTMAN

// Es una herramienta para probar los demás metodos HTTP, otra alternativa es ThunderClient

// Puedes seleccionar el tipo de request: GET, POST, PUT, etc. A diferencia del navegador que solamente soporta GET y POST

// PETICIONES EN POSTMAN

// Realiza una petición de tipo GET a la URL http://localhost:4000/, mostrara "Desde GET"

// Puede tener una diagonal "/" al final de la URL

// Cualquier otra ruta no definida como el endpoint "/nosotros" mostrara "Cannot GET /nosotros"

// Realiza una petición de tipo POST a la URL http://localhost:4000/, mostrara "Desde POST"

// Repite el mismo procedimiento con los demás metodos

// THUNDERCLIENT

// Es similar a postman, pero funciona dentro de VSCode

// Instala la extensión "Thunder Client", reinicia el servidor, pulsa CTRL + C 2 veces en la consola y escribe el comando "npm run dev"

// En VSCode, podras ver en el panel izquierdo el icono de thunderClient haz clic en el icono, luego en el botón "New Request"

// La interfaz grafica de thunderClient es similar a postman

// Puedes enviar las peticiones de tipo GET, POST, PUT, PATCH y DELETE a la URL http://localhost:4000/

/* */

// RUTAS EN UNA API

// Las APIs se tiene que definir en base a los requerimientos del sistema, se recomienda tener un archivo aparte para gestionar las rutas

// Puedes crear el archivo router.ts en la carpeta src

// Para este caso debes utilizar el metodo "use" instanciado en server para englobar todos los verbos HTTP, "use" se ejecuta en cada ruta definida

// use requiere una URL global y una instancia de la función router definida en router.ts
// server.use('/', router)

// Realiza una petición a la URL: http://localhost:4040/, con cualquier tipo: GET, POST, etc; en postman o thunderclient, obtendrás el mismo resultado

// Una ventaja de use es que permite cambiar la ruta. Puedes cambiar "/" por "/api" y luego realizar una petición a la URL http://localhost:4040/api/ y se obtiene el mismo resultado. Es util cuando se quiere versionar la API al realizar mejoras

server.use('/api/products', router)
// Realiza la petición de tipo GET a http://localhost:4040/api/productos/ y se obtiene el mensaje "Desde GET" (esta definido en router.ts). Tambien se puede tener multiples archivos de tipo router para diferentes escenarios

/* */

// Exporta server
export default server