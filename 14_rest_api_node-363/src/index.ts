import server from "./server";

// No olvidar importar colors luego de instalar colors.js
import colors from "colors"

// Crea una variable para el puerto
// const port = 4000

// Normalmente el puerto se asigna por el servidor luego de hacer un deploy del proyecto por medio de una variable de entorno que siempre es "process.env.PORT"

// Asigna el puerto definido en la variable de entorno PORT, si no existiera, se asigna el puerto 4000
const port = process.env.PORT || 4000

server.listen(port, () => {
    // Imprime el mensaje de color cyan y en negrita
    console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})

// ORM'S EN NODE.JS

// Un ORM simplifica la comunicación entre una base de datos y el código de tu aplicación

// En lugar de escribir consultas de SQL escribes funciones que son bastante similares a el codigo que ya escribes

/* */

// VENTAJAS DE UN ORM

// Abstracción: Esto significa que puedes interactuar con la base de datos usando objetos, clases y métodos en lugar de escribir consultas SQL complicadas

// Portabilidad: Puedes cambiar de un sistema de gestión de bases de datos a otro sin tener que reescribir todo tu código

// Productividad: El ORM se encarga de tareas repetitivas como la generación de consultas SQL, lo que te permite enfocarte en la lógica de tu aplicación

/* */

// CONSIDERACIONES A LA HORA DE ELEGIR UN ORM

// Debe estar en desarrollo de forma activa

// Un ORM asegura la entrada de la información, pero siempre debes validar

// Cambiar de ORM's puede no ser tan simple, elige con cuidado antes de iniciar un proyecto

/* */

// ORM's EN NODE.JS

// Mongoose
// Prisma
// Sequelize <---
// TypeORM

/* */

// SEQUELIZE ORM

// Sequelize soporta TypeScript y diferentes bases de datos

// Oracle, PostgreSQL, MySQL, MariaDB, SQLite y SQL Server

// También soporta relaciones de información, lazy loading, eager loading y más

/* */

// SERVICIOS EN LA NUBE PARA CREAR LA BASE DE DATOS

// Filess.io

// Soporta diferentes bases de datos: MySQL, MariaDB, PostgreSQL y mongoDB

// https://filess.io/

//

// Render <---

// Permite tener bases de datos, proyectos con un backend y proyectos estaticos

// El plan gratis no es para un entorno de producción, se recomienda crear una cuenta con una cuenta de GitHub

// https://render.com/

// Luego de crear una cuenta, ve a la opción "New PostgreSQL"

// Establece el nombre: rest-api-node-typescript
// Nombre de la base de datos y usuario (se deja en blanco)
// Región (elige la más cerca a tu ubicación)
// PostgreSQL versión (ultima versión de PostgreSQL)
// Plan Option (selecciona el plan gratuito, 256 MB RAM y 1 GB de almacenamiento)

// Nota: Luego de 90 dias se elimina automaticamente la base de datos, puedes exportar y luego volver a importar los datos en una nueva base de datos

// Pulsa el boton create database y espera unos 5 minutos para que lo pueda crear (El Status debe mostrar "Available", disponible)

/* */

// CONECTAR LA APLICACIÓN DE EXPRESS A UNA BASE DE DATOS

// En Render, se puede ver las credenciales de conexión a la base de datos: Hostname, Port, Database, Username, Password, etc.

// Para instalar Sequelize, se tiene que instalar la dependencia para la base de datos, en este caso, para PostgreSQL ejecuta los comandos (desde una terminal desde VSCode):

// npm install --save sequelize
// npm install --save pg pg-hstore

// Ocurre un cambio en package.json, se muestra las dependencias: "pg", "pg-hstore" y "sequelize"

// Obtenido de:
// https://sequelize.org/docs/v6/getting-started/

// Crea una carpeta llamada config en la carpeta src, sirve para las configuraciones, en este mismo contexto, crea el archivo "db.ts" dentro de la carpeta "config".



/* */

