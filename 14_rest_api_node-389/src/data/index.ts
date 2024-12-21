import { exit } from 'node:process'
import db from '../config/db'

const clearDB = async () => {
    try {
        await db.sync({ force: true })
        console.log('Datos eliminados correctamente')

        exit(0)
    } catch (error) {
        console.log(error)

        exit(1)
    }
}

console.log(process.argv)

if (process.argv[2] === '--clear') {
    clearDB()
}


// CODE COVERAGE

// La cobertura de codigo es una métrica utilizada para medir la cantidad de código fuente que ha sido ejecutado o cubierto por un conjunto de pruebas

// En otras palabras, mide qué porcentaje del código de un programa ha sido aprobado. Cuando mayor sea la cobertura de código, más exhaustivas son las pruebas, lo que a menudo se considera un indicador positivo de la calidad del software

// METRICAS DE CODE COVERAGE

// < 60% - No es suficiente
// 60% - 80% - Se puede mejorar
// >= 80% - Es suficiente y buena medida
// 100% - Poco probable

/* */

// Ve al archivo package.json y añade en el objeto script la propiedad "test:coverage" : "npm run pretest && jest --detectOpenHandles --coverage", esto ejecuta primero el pretest y luego el coverage

// Ejecuta el comando "npm run test:coverage"

// En la consola se mostrara un tabla con resultados positivos de coverage, se muestra los archivos que se ejecuta y los porcentajes de:

// Lines --> el porcentaje de las lineas de codigo de ese archivo que se ejecuto durante las pruebas (100% quiere decir que se ejecuto toda las lineas de codigo)

// Las lineas que no se ejecutaron se muestran en color rojo en Uncovered Line #s, una solución es escribir pruebas para esas lineas, no necesariamente se tiene que llegar al 100% de las pruebas

// Stmts --> statements, mide la cobertura de instrucciones, instrucciones individuales en lugar de las lineas completas, util para detectar instrucciones no ejecutadas o inalcanzables

// Branch --> mide si todas las posibles ramificaciones como if, switch, etc. Han sido ejecutadas en su estado verdadero y en su estado falso

// Funcs --> porcentaje de funciones que se tiene en el archivo

// En este caso se muestra las lineas de codigo en que no se han aplicado pruebas en el archivo product.ts, hace referencia a los mensajes de errores de catch, se puede ejecutar el catch si no se tiene una conexión a la base de datos. Puedes optar por eliminar el bloque try-catch y solamente utilizar el contenido definido en try

// Recuerda que no hubo una prueba para el metodo path para actualizar la disponibilidad

/*
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   87.37 |       80 |    90.9 |   86.31 |                          
 src               |   93.33 |      100 |     100 |   93.33 |                          
  router.ts        |     100 |      100 |     100 |     100 |                          
  server.ts        |    87.5 |      100 |     100 |    87.5 | 12-14                    
 src/config        |     100 |      100 |     100 |     100 |                          
  db.ts            |     100 |      100 |     100 |     100 |                          
 src/handlers      |   78.84 |       75 |   83.33 |   76.08 |                          
  product.ts       |   78.84 |       75 |   83.33 |   76.08 | 11,32,53,78-93           
 src/middleware    |     100 |      100 |     100 |     100 |                          
  index.ts         |     100 |      100 |     100 |     100 |                          
 src/models        |     100 |      100 |     100 |     100 |                          
  Product.model.ts |     100 |      100 |     100 |     100 |                          
-------------------|---------|----------|---------|---------|-------------------       
*/