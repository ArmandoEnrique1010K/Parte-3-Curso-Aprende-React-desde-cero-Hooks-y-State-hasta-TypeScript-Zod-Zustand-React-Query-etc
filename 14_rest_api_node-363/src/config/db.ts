// Importa una instancia de Sequelize
import { Sequelize } from "sequelize";
// Importa dotenv luego de instalarlo
import dotenv from 'dotenv'


// Sequelize instancia el nombre de la base de datos, nombre del usuario y contraseña (para ver las distintas formas, coloca el cursor sobre "Sequelize")
// const db = new Sequelize();

// Siguiendo con la base de datos creada en Render, copia la URL que se muestra en "External Database URL" y pegalo como un string en el argumento del constructor
// const db = new Sequelize("postgresql://rest_api_node_typescript_ugcw_user:eKOLJJ2hq7qPETEJK6NYoWjRwnxPNP03@dpg-cth2shhopnds73au9mm0-a.oregon-postgres.render.com/rest_api_node_typescript_ugcw");

// Existe 2 formas de solucionar el error SSL/TLS required:
// 1° forma: Agrega "?ssl=true" en la URL de conexión
// const db = new Sequelize("postgresql://rest_api_node_typescript_ugcw_user:eKOLJJ2hq7qPETEJK6NYoWjRwnxPNP03@dpg-cth2shhopnds73au9mm0-a.oregon-postgres.render.com/rest_api_node_typescript_ugcw?ssl=true");

// 2° forma: Agrega un segundo argumento, un objeto que contiene dialectOptions
// const db = new Sequelize("postgresql://rest_api_node_typescript_ugcw_user:eKOLJJ2hq7qPETEJK6NYoWjRwnxPNP03@dpg-cth2shhopnds73au9mm0-a.oregon-postgres.render.com/rest_api_node_typescript_ugcw?ssl=true", {
//     // Opciones para la conexión
//     dialectOptions: {
//         // No requiere SSL
//         ssl: {
//             require: false
//         }
//     }
// });

/* */

// Lo ideal es colocar la URL de conexión en una variable de entorno para que no pueda ser accesible en un repositorio, para aquello se requiere una dependencia llamada dotenv

// Instalala con el comando "npm i dotenv"

// https://www.npmjs.com/package/dotenv

// Luego crea el archivo ".env", fuera de la carpeta src

// Copia de seguridad del archivo ".env"

/*

# Crea la variable de entorno, lleva cualquier nombre, a diferencia de VITE
DATABASE_URL=postgresql://rest_api_node_typescript_ugcw_user:eKOLJJ2hq7qPETEJK6NYoWjRwnxPNP03@dpg-cth2shhopnds73au9mm0-a.oregon-postgres.render.com/rest_api_node_typescript_ugcw?ssl=true

*/

// Llama a las variables de entorno definidas en el archivo ".env"
dotenv.config();

// Imprime todas las variables de entorno, además de las que tiene instaladas Node
// console.log(process.env)

// Imprime la variable de entorno DATABASE_URL
// console.log(process.env.DATABASE_URL)

// Ahora reemplaza la URL por la variable de entorno (coloca un signo de exclamación al final para que sepa que siempre va a existir y no sea un any)
const db = new Sequelize(process.env.DATABASE_URL!);

// Puede tardar en mostrar "Conexión exitosa a la BD" porque el plan gratuito de Render puede ser lento

/* */

// Para tener una lista de archivos que se van a ignorar cuando se suebe este proyecto a GitHub, crea el archivo .".gitignore", fuera de la carpeta raiz src. Dentro de ella define los archivos y carpetas que no se van a subir

// Copia de sguridad del archivo ".gitignore"

/*

# Carpeta de librerias instaladas
node_modules/

# Carpeta de deploy del proyecto
dist/

# Archivos de variables de entorno
.env

*/

/* */

// Para conectarse a un cliente como Dbeaver para ver los datos de la base de datos.

// Puedes instalar Dbeaver desde el siguiente enlace: https://dbeaver.io/download/ (versión community)

// Abre Dbeaver, debajo del menu archivo haz clic en el icono de "nueva conexión", selecciona la base de datos PostgreSQL

// Selecciona el tipo de conexión "Host" y luego toma los valores de la variable de entorno

// DATABASE_URL = postgresql://rest_api_node_typescript_ugcw_user:eKOLJJ2hq7qPETEJK6NYoWjRwnxPNP03@dpg-cth2shhopnds73au9mm0-a.oregon-postgres.render.com/rest_api_node_typescript_ugcw?ssl=true

// El host se encuentra despues del caracter @: dpg-cth2shhopnds73au9mm0-a.oregon-postgres.render.com
// El puerto es: 5432
// La base de datos esta despues del caracter /: rest_api_node_typescript_ugcw

// El modo de autenticación se deja en: Database Native
// Nombre de usuario se encuentra despues del caracter //: rest_api_node_typescript_ugcw_user
// La contraseña, despues del caracter dos puntos: eKOLJJ2hq7qPETEJK6NYoWjRwnxPNP03

// Luego haz clic en el botón Probar conexión y debe aparecer un cuadro de dialogo que diga "Conectado". Pulsa el botón Finalizar y en el panel izquierdo se crea la conexión

// Puedes ir al panel izquierdo y expandir la carpeta "Bases de Datos", el nombre de la base de datos, carpeta "Esquemas", "public" y "Tablas" (ahi se crearan las tablas para la base de datos)

// pgAdmin es una herramienta de PostgreSQL para conectarse a la base de datos

/* */



/* */

// Exporta este modulo
export default db