// Cada vez que se realiza una prueba, se debe limpiar la base de datos

// Este archivo contiene el codigo para limpiar la base de datos cada vez que se hace una prueba

// exit detiene la ejecución del codigo en node.js
import { exit } from 'node:process'

// requiere la instancia de sequelize
import db from '../config/db'

// Función asincrona para limpiar la base de datos
const clearDB = async () => {
    try {
        // Elimina todos los datos de la base de datos
        await db.sync({ force: true })
        console.log('Datos eliminados correctamente')

        // Finaliza el programa correctamente
        exit(0)
    } catch (error) {
        console.log(error)

        // Exit finaliza el programa, en este caso si hay un error se utiliza el parametro 1
        exit(1)
    }
}

// Se llama a process.argv desde la terminal. "process.argv" es el codigo que se ejecuta desde la linea de comandos de node (terminal)
console.log(process.argv)

// si process.argv se ejecuta desde la consola
// Realiza una modificación en el archivo package.json, coloca la siguiente propiedad en el objeto script
// "db": "ts-node ./src/data"

// Ejecuta el comando npm run db e imprime process.argv, un arreglo similar al siguiente con la ubicación de los archivos

// ['...\\14_rest_api_node\\node_modules\\ts-node\\dist\\bin.js', '...\\14_rest_api_node\\src\\data'

// Como es un arreglo "ts-node" es el primer elemento (indice 0), "./src/data" es el segundo elemento (indice 1)

// En este caso se añade un tercer parametro

// Ahora coloca esto en el objeto script en package.json
// "db": "ts-node ./src/data --clear"

if (process.argv[2] === '--clear') {
    clearDB()
}

// De esta manera se ha creado un Command Line en Nodejs para ejecutar ciertos archivos, accede a la base de datos o agrega algunos archivos, etc.

// Ejecuta el comando "npm run dev"

// Accede a la URL desde el navegador: http://localhost:4000/api/products y observa los productos que se tienen hasta el momento

// Abre una nueva terminal y ejecuta el comando "npm run db", vuelve a acceder a http://localhost:4000/api/products y observa que no hay ningun registro

/* */

// Pero ahora para evitar repetir cierto scripts, puedes cambiar ir a package.json y modificar

// "db": "ts-node ./src/data --clear" por "pretest": "ts-node ./src/data --clear"

// Pretest es un comando especial que se ejecuta antes de test (antes de ejecutar las pruebas)

// Ejecuta el comando "npm test" y observa que se ejecuta el comando "npm run pretest" para limpiar la base de datos

// En lugar de pretest, tambien existe posttest para ejecutar un comando luego de ejecutar las pruebas

/* */

