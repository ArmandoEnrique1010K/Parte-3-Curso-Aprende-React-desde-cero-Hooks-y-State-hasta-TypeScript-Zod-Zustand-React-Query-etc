import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {

    it('should display validation errors', async () => {

        const response = await request(server).post('/api/products').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should validate that the price is greater than 0', async () => {

        const response = await request(server).post('/api/products').send({
            name: "Monitor Curvo",
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor Curvo",
            price: "Hola"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })

    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 50
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})

// Crea un nuevo describe para obtener los productos
describe('GET /api/products', () => {

    // Verifica que la URL exista
    it('should check if api/products url exists', async () => {
        // Realiza la petición al endpoint /api/products
        const response = await request(server).get('/api/products')

        // El status de la respuesta no deberia ser 404
        expect(response.body).not.toBe(404)
    })

    // Obtiene un JSON en la respuesta con productos
    it('GET a JSON response with products', async () => {
        // Realiza la petición al endpoint /api/products
        const response = await request(server).get('/api/products')

        // Realiza una petición de tipo GET a http://localhost:4000/api/products, se obtiene un status 200 y la respuesta es un objeto JSON con los datos

        // Se espera lo siguiente: status 200 y que el tipo de contenido devuelto sea un JSON
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)

        // Espera que el objeto de la respuesta tenga la propiedad data y que solamente tenga 1 producto (esto puede variar de acuerdo a la cantidad de productos)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        // Puedes utilizar variables para la URL y la cantidad de elementos para que sea dinamico

        // Lo que no se espera (contraparte)
        expect(response.body).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})

// Recuerda que el primer describe, añade un producto en la prueba "should create a new product" 

// Crea un nuevo describe para obtener un producto
describe('GET /api/products/:id', () => {

    // Retorna un status 404 en la respuesta si el producto no existe
    it('Should return a 404 response for a non-existent-product', async () => {
        // Id dinamico
        const productId = 2000
        // Realiza la petición al endpoint /api/products/id, el id es dinamico
        const response = await request(server).get(`/api/products/${productId}`)

        // Se espera un status 404 en la respuesta, que la respuesta tenga la propiedad error y que tenga el valor "Producto No Encontrado"
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto No Encontrado')
    })

    // Verifica que se pase una URL valida en la petición
    it('Should check a valid ID in the URL', async () => {
        // Realiza la petición al endpoint no valido
        const response = await request(server).get('/api/products/not-valid-url')

        // Se espera un status 400 y no un 404, que tenga la propiedad errors en la respuesta. que tenga un objeto y que el mensaje de error (propiedad msg) sea "Id no valido"
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    // Realiza el mismo procedimiento para obtener un producto valido
    it('get a JSON response for a single product', async () => {
        // En este caso, se busca el producto por el ID igual a 1
        const response = await request(server).get('/api/products/1')

        // Se espera que tenga el status 200 y la propiedad data en el objeto de la respuesta
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })

})

// Crea un nuevo describe para actualizar un producto
describe('PUT /api/products/:id', () => {

    // Prueba para verificar que se realice la petición hacia una URL valida
    it('should check a valid ID in the URL', async () => {
        const response = await request(server)
            .put('/api/products/not-valid-url')
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300
            })

        // Se espera lo siguiente: status 400, propiedad erros, un elemento en la respuesta y el mensaje de error "Id no válido"
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    // Prueba para mostrar los errores de validación cuando se actualiza un producto
    it('should display validation error messages with updating a product', async () => {
        // Realiza la petición de tipo put, hacia el producto con el id 1
        const response = await request(server).put('/api/products/1').send({})

        // Realiza la petición y se obtiene 2 mensajes de error

        // Se espera lo siguiente: status 400, propiedad errors en la respuesta y 
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

        // toBeTruthy evalua la respuesta si tiene algun contenido, devuelve true, de lo contrario devuelve false (contexto de boolean)
        expect(response.body.errors).toBeTruthy()

        // Nota: Se considera false si devuelve uno de esots valores: false, 0, '', null, undefined y NaN

        // Tambien existe el metodo contrario: toBeFalsy

        // Se espera que devuelva 5 objetos en la respuesta (5 mensajes de errores)
        expect(response.body.errors).toHaveLength(5)

        // Contraparte de las pruebas
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })


    // Prueba para verificar que el precio tenga valores positivos (mayor que 0)
    it('should validate that the price is greater that 0', async () => {
        const response = await request(server)
            .put('/api/products/1')
            // Envia un objeto para actualizar el registro
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 0
            })

        // Nota: Primero realiza una petición de tipo PUT al endpoint /api/products/1, para verificar la respuesta y construir lo que se espera en base a esa respuesta
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()

        // Solamente hay un mensaje de error
        expect(response.body.errors).toHaveLength(1)

        // Verifica el mensaje de error (propiedad msg del primer elemento de errors)
        expect(response.body.errors[0].msg).toBe('Precio no válido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    // Prueba para validar que retorne un status 404 si el producto no existe
    it('should validate that the price is greater that 0', async () => {

        // Id dinamico (no existe ese producto con ese id)
        const productId = 2000
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300
            })

        // Primero realiza la petición en thunderclient para obtener la respuesta y luego esperar en base a esa respuesta

        // Mensaje de error 404
        expect(response.status).toBe(404)
        // Propiedad error y su mensaje
        expect(response.body.error).toBe('Producto No Encontrado')

        // Contraparte de las pruebas
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    // Prueba para actualizar el producto
    it('should update an existing product with valid data', async () => {
        const response = await request(server)
            // Realiza la petición para actualizar el produto con el id 1
            .put(`/api/products/1`)
            .send({
                name: "Monitor Curvo",
                availability: true,
                price: 300
            })

        // Se espera lo siguiente
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })

})

// Crea un describe para eliminar un producto
describe('DELETE /api/products/:id', () => {

    // Una URL que no es valido
    it('should check a valid ID', async () => {

        // Realiza la petición de tipo DELETE al endpoint /api/products/not-valid
        const response = await request(server).delete('/api/products/not-valid')

        // Se espera lo siguiente
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    // Retorna un status 404 en la respuesta si el producto no existe
    it('should return a 404 response for a not-existent product', async () => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)

        // Se espera un status 404 (cuando es algo que no existe) y el mensaje de error
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')

        // Contraparte del status
        expect(response.status).not.toBe(200)
    })

    // Prueba para eliminar un producto permanentemente
    it('should return a 404 response for a not-existent product', async () => {
        const response = await request(server).delete(`/api/products/1`)

        // Se espera un status 200 y la respuesta
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto Eliminado')

        // Contraparte del status
        expect(response.status).not.toBe(404)
    })

})


// Ejecuta npm test para ejecutar las pruebas