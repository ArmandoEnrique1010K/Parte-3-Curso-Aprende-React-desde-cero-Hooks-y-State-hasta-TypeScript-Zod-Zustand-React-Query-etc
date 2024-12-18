// Instala express con el comando "npm i express", es una dependencia de producción

// Luego instala la dependencia de desarrollo express con el comando "npm i -D @types/express", si estas trabajando con typescript

// Crea el archivo "server.ts", dentro de src

// Importa el modulo server
import server from "./server";

// Puerto del servidor, puede ser cualquier puerto
server.listen(4000, () => {
    console.log(`REST API en el puerto 4000`)
})

// Recuerda que el comando "npm run dev" sirve para ejecutar el servidor, esta configurado para ejecutar nodemon en package.json