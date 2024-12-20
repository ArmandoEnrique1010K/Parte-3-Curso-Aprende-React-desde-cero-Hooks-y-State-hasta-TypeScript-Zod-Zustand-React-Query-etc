
// Describe es una función global de jest, sirve para agrupar una serie de pruebas. Toma el nombre de la prueba y un callback o función de flecha
// describe('Nuestro primer test', () => {
//     // it es un alias de test, puedes utilizar una de esas 2 funciones. Lleva 2 argumentos, el nombre de la prueba y un callback
//     it('Debe revisar que 1 + 1 sean 2',
//         () => {
//             // Expect es lo que se espera
//             // toBe es el valor con el que se va a comparar
//             expect(1 + 1).toBe(2)
//         }
//     )


//     // Prueba que no cumpla
//     it('Debe revisar que 1 + 1 no sean 3',
//         () => {
//             // not es una propiedad para que el valor que espera no sea igual al valor con el que se va a comparar
//             expect(1 + 1).not.toBe(3)
//         }
//     )

// })

// Para ejecutar la prueba, ve al archivo package.json para añadir un nuevo script ---> "test": "jest" dentro del objeto scripts como una nueva propiedad.

// Luego ejecuta el comando "npm test" para ejecutar las pruebas. En la consola debe mostrar PASS para que una prueba pase. FAIL indica que una prueba no ha pasado y muestra el error en la consola.

/* */

// Supertest sirve para realizar consultas externas

// Se recomienda que los archivos de prueba, lleven la extensión ".test.ts" y se encuentren dentro de la carpeta "__tests__"

// Importa request para enviar una petición a un endpoint del proyecto
import request from 'supertest';

// Importa server tambien
import server from '../server'

// Nombre para la prueba, enviar una petición de tipo GET al endpoint "/api"
// Se recomienda colocar los nombres de la prueba en ingles
describe('GET /api', () => {
    it('should send back a json response', async () => {
        // La conexión al servidor es una prueba asincrona
        const res = await request(server).get('/api')

        // Para que no muestre un error al hacer la prueba, comenta los mensajes de la consola que se imprimen cuando se conecta a la base de datos en la función connectDB (archivo server.ts) y en db.ts realiza una configuración 

        // Imprime toda la respuesta, es un objeto muy grande
        // console.log(res)

        // Se espera que el status tenga el numero 200 (estado cuando la solicitud se ejecuta correctamente)
        expect(res.status).toBe(200)

        // Se espera que la respuesta sea un JSON
        expect(res.headers['content-type']).toMatch(/json/)

        // Debe imprimir application/json
        console.log(res.headers['content-type'])

        // Si la ruta no existiera, entonces la respuesta no podra ser un JSON, el status es 404 si no existe la ruta
        // expect(res.status).toBe(404)

        // Imprime la respuesta como un texto (no puedes acceder a las propiedades del objeto JSON)
        console.log(res.text)

        // Imprime la respuesta, puedes acceder a las propiedades
        console.log(res.body.msg)

        // Realiza el mismo procedimiento para esperar que la propiedad msg de la respuesta tenga ese texto (reconoce mayusculas y minusculas)
        expect(res.body.msg).toBe('Desde API')

        // Puedes enviar una petición de tipo GET a http://localhost:4000/api en thunderclient y muestra un status: 200 OK

        // Al escribir una prueba, se debe escribir lo que se debe hacer y lo que no se debe hacer

        // "Contraparte de lo se esperaba anteriormente"
        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')


    })
})

// Una advertencia en la consola es que solicita que ejecute Jest con "--detectOpenHandles", para aquello cambia "test": "jest" por "test": "jest --detectOpenHandles", en el archivo package.json. Luego ejecuta npm test para ejecutar ese comando y no mostrar la advertencia

