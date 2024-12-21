import request from 'supertest';
// Importa la función connectDB y la instancia de db de config
import server, { connectDB } from '../server'
import db from '../config/db';


describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})

// MOCK: Tecnica para las pruebas para simular el comportamiento de un modulo en un entorno

// Primero se tiene que importar la función para conectar a la base de datos y luego lanzar el error para que se ejecute

// Prueba para simular la conexión a la base de datos

// Importa y llama a un mock, pasale la ubicación de la base de datos
jest.mock('../config/db')

describe('connectDB', () => {
    it('should handle database connection error', async () => {

        // La función spyOn sirve para espiar, toma un objeto y la función. Crea una función en el ambiente del mock y se le pasa la base de datos y el metodo que se quiere observar su comportamiento (similar a jest.fn)

        // El metodo debe ir como un string (authenticate se encuentra en server.ts)
        jest.spyOn(db, 'authenticate')
            // mockRejectedValueOnce lanza una excepción para hacer un catch, niega la promesa
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la base de datos'))

        // Espera por un objeto de consola y lee el metodo log
        const consoleSpy = jest.spyOn(console, 'log')

        // Una vez que se han definido los espias, se llama a la base de datos (asincrono porque no se sabe cuanto va a tardar en conectarse)
        await connectDB()

        // Se espera a que consoleSpy, cuando ocurra la conexión, lance la excepción

        // toHaveBeenCalledWith sirve para asegurar de que un mock haya sido llamado con ciertos argumentos
        expect(consoleSpy).toHaveBeenCalledWith(
            // Se espera que el mensaje tenga el siguiente string
            expect.stringContaining('Hubo un error al conectar a la base de datos')
        )
    })

    // Con este mock se espia para obtener el error mencionado
})

// Ejecuta el comando npm test, debe pasar la prueba en la que se niega la conexión a la base de datos

// Ejecuta el comando "npm run test:coverage", observa que ya no hay lineas sin llamar, todo esta al 100%, no hay lineas de codigo que falten probar, aunque suene algo exagerado porque las pruebas son bastante rigurosas
