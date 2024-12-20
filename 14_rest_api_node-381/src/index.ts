import server from "./server";
import colors from "colors"

const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})


// TESTING - JEST Y SUPERTEST

// TESTING EN API'S

// Escribir Testing para nuestra API's no es muy diferente que aplicar testing a aplicaciones en React.

// No porque nuestra API este hecha con TypeScript significa que no vamos a añadir pruebas. Las pruebas siempre deben estar ahí y en muchos trabajos tu código debe ir acompañado por un serie de tests.

// TIPO DE TESTING EN NODE.JS y API'S

// Unit Testing: Verificar que partes individuales en nuestro código funcionen; tales como crear el servidor, visitar una ruta, debemos revisar que cada pieza funcione como esperamos antes de integrarla con otras

// Integration Testing: Una vez que revisamos que algunas piezas de código funcionen por si solas, es momento de revisar cuando 2 o más se unen, tales como visitar una ruta y obtener datos, o enviar una petición post, validar, y entonces crear el producto

// JEST

// Es uno de los frameworks para aplicar testing más conocidos hoy en día, funciona con TypeScript, Node.js, React, Angular y Vue.js

// La configuración es muy simple, los test corren aparte y no se mezclan con el código existente

// SUPERTEST

// Jest nos da una serie de funciones para probar el código, pero con supertest podremos realizar peticiones hacia nuestra API y revisar que el código funcione como esperamos

// Con supertest podremos realizar pruebas de integración entre las URL's de nuestra API y el ORM


/* */

// Instala las dependencias jest y supertest con el comando:

// npm i -D supertest @types/supertest jest @types/jest ts-jest

// ts-jest ejecuta el codigo de typescript con jest

// Luego escribe "npx ts-jest config:init", crea el archivo jest.config.js

// Ahora puedes crear tu test

// EXTENSIONES PARA JEST

// Jest puede leer archivos de 3 formas:

// Archivos con la extensión .test.js, .spec.js o dentro de la carpeta "__tests__"

/* */

// Crea la carpeta __tests__ dentro de la carpeta src y luego crea el archivo server.test.ts