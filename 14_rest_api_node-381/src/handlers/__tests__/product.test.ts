// Este archivo contiene las pruebas para product.ts (funciones intermedias para los productos)

// Se recomienda crear una carpeta "__tests__" dentro de handlers

// Importa lo necesario: request de supertest y el modulo server
import request from 'supertest'
import server from '../../server'

// Descripción de la prueba, realizar una petición de tipo POST al endpoint /api/products
describe('POST /api/products', () => {

    // Prueba para mostrar los mensajes de validación
    it('should display validation errors', async () => {

        // Envia un objeto vacio a la URL
        const response = await request(server).post('/api/products').send({})

        // Se espera que la respuesta tenga un status 400 y tenga una propiedad 'errors' en el objeto devuelto por la respuesta
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        // El arreglo de errores se muestra cuando no envias un objeto JSON o un objeto con propiedades incompletas en la respuesta al endpoint /api/product (petición de tipo POST)

        // Se espera que la propiedad errors tenga 4 elementos (por defecto se muestra 4 mensajes de errores si se envia un objeto vacio a la petición)
        expect(response.body.errors).toHaveLength(4)

        // Contraparte de lo que se espera
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)

    })

    // Al enviar una petición de tipo POST al endpoint "/api/products", si en el objeto la propiedad price es 0, muestra un mensaje de error "Precio no válido"

    // Prueba para validar que el precio sea mayor que 0
    it('should validate that the price is greater than 0', async () => {

        // Envia un objeto a la petición
        const response = await request(server).post('/api/products').send({
            name: "Monitor Curvo",
            // El precio es 0
            price: 0
        })

        // Realiza el mismo procedimiento
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        // Solamente se espera un mensaje de error
        expect(response.body.errors).toHaveLength(1)

        // La contraparte de lo que se espera sigue igual
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    // Prueba para validar que el precio sea de tipo string
    it('should validate that the price is a number and greater than 0', async () => {

        // Envia un objeto a la petición
        const response = await request(server).post('/api/products').send({
            name: "Monitor Curvo",
            // El precio es un texto
            price: "Hola"
        })

        // Realiza el mismo procedimiento
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        // Se espera 2 mensajes de error
        expect(response.body.errors).toHaveLength(2)

        // La contraparte de lo que se espera sigue igual
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })



    // Prueba para crear un producto
    it('should create a new product', async () => {
        // Se recomienda tener 2 bases de datos: una de producción y otra de pruebas

        // Request de supertest es similar a axios para las pruebas, admite los metodos http. send sirve para enviar un objeto a la petición
        const response = await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 50
        })

        // Espera que la respuesta tenga un status 201
        // toEqual es un metodo similar a toBe
        expect(response.status).toEqual(201)

        // Espera a que la respuesta retorne un objeto que tenga la propiedad data (ahi contiene los datos que devuelve la respuesta)
        expect(response.body).toHaveProperty('data')

        // Ejecuta las pruebas escribiendo el comando "npm test"

        // Contraparte de las pruebas esperadas
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')

    })
})

// Recuerda que en la consola, las pruebas deben pasar si muestra: Tests: 5 passed, 5 total

// Cada vez que se hace una prueba, se recomienda tener una base de datos local de pruebas, porque los productos que se envian en la respuesta se almacenan en la base de datos