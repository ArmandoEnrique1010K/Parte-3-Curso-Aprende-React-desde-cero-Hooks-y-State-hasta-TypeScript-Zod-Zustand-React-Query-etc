"use strict";
// REST API's
Object.defineProperty(exports, "__esModule", { value: true });
// ¿Qué es una REST API ?
// Es un conjunto de reglas que permiten que aplicaciones se comuniquen entre sí a través de la web.
// REST = Representational State Transfer
// Puede ser diseñada en cualquier lenguaje
// Debe responder a los Request HTTP: GET, POST, PUT, PATCH, DELETE
// Tiene una forma ordenada y estructurada de poner a disposición los recursos de una base de datos
/* */
// VERBOS HTTP
// GET - Obtener datos
// POST - Enviar datos / Creación
// PUT / PATCH - Actualización
// DELETE - Eliminar
/* */
// ENDPOINTS DE UNA REST API
// Una REST API cuanta con varios endpoints (o URLs) para hacer operaciones CRUD. Ejemplo:
// Listar todos los clientes
// GET   /clientes
// Obtener un solo cliente
// GET   /clientes/10
// Crear un nuevo cliente
// POST   /clientes
// Editar un cliente
// PUT   /clientes/10
// Borrar un cliente
// DELETE   /clientes/8
/* */
// VENTAJAS DE UNA REST API
// Simplicidad de creación
// Es una forma escalable y ordenadad de crear un proyecto
// Facilidad de uso y se pueden consumir en React, Angular, Vue.js, Flutter, Kotlin, Swift, etc.
/* */
// HERRAMIENTAS PARA CREAR REST API's
// Cualquier lenguaje de programación que se ejecute en el servidor puede servir para crear una REST API: Python, PHP, Java, C#, etc.
// Muchos frameworks soportan la creación de REST API's y simplifican mucho este proceso entre ellos Laravel, Express, Rails o Django.
// Una base de datos como MySQL, PostgreSQL o MongoDB
/* */
// PERN STACK
// Son las iniciales de PostgreSQL - Express - React - Node.js
// Un stack es un conjunto de herramientas para crear una app
// Full Stack quiere decir que puedes crear el Stack completo de una App y PERN Stack te permite hacerlo
// React en el Front End y Node en el backend son una combinación muy común
// Puedes utilizar React con Backends de Django, Rails o Laravel
/* */
// POSTGRESQL
// Tambien llamado Postgres, es un sistema de gestión de bases de datos relacional orientado a objetos y de código abierto
// Para interactuar con nuestra base de datos podemos hacerlo por medio de un ORM.
// Un ORM tiene todos los métodos para crear, obtener, actualizar y eliminar datos de nuestra base de datos
/* */
// EXPRESS
// Infraestructura web rápida, minimalista y flexible para Node.js
// A diferencia de Rails o Laravel no tiene un sistema de vistas definido, tampoco ORM o Autenticacion; sino que te deja mucha parte de la configuración en tus manos
// Ideal para utilizarse en Aplicaciones web monoliticas o como API
/* */
// NODE.JS
// Entorno de ejecución en JavaScript que se ejecuta en el servidor
// Entre sus ventajas se encuentra la gran cantidad de librerías disponibles para integrarlas en proyectos con NPM
// Puede consultar base de datos, autenticar usuarios, manejar rutas y mucho más
/* */
// VENTAJAS DE PERN o MERN
// Separación de backend y frontend
// Comunicación entre backend y frontend con JSON y peticiones HTTP
// NPM con una gran cantidad de dependencias
// Solo codigo de JavaScript / TypeScript para crear aplicaciones Full Stack
// CREANDO EL PROYECTO REST API
// Para crear una REST API que se conectara a la base de datos para crear los registros
// Primero crea una carpeta de forma manual para el proyecto, en este caso: "14_rest_api_node"
// Abre una terminal powershell e introduce los comandos:
// cd << Ruta hacia la carpeta "14_rest_api_node" >>
// npm init
// Ese ultimo comando sirve para generar el archivo "package.json", no hay un estandar para express, pide algunas configuraciones (pulsa la tecla ENTER para ir a la siguiente configuración):
// Nombre del paquete: 14_rest_api_node*
// Versión: 1.0.0*
// Descripción: REST API's con Express y TypeScript
// Punto de entrada: index.js*
// Pulsa ENTER si aparece opciones test command, git repository y keywords (se dejan en blanco)
// Autor: Juan De la torre @codigoconjuan
// Licencia: ISC*
// *Solamente pulsa Enter
// Cuando aparezca la opción "Is this OK? (yes)", pulsa Enter para generar el archivo package.json
/* */
// ABRIR EL PROYECTO EN VSCODE
// Arrastra la carpeta "14_rest_api_node" hacia VSCode
// Crea una carpeta llamada src en la raiz del proyecto para colocar los archivos y el codigo fuente
// Cuando creas un servidor en Express puedes crearlo como JavaScript y solamente lo subes a algún servidor que soporte Node js y es todo lo que requiere.
// Sin embargo cuando escribes el código en TypeScript, no puedes subir porque TypeScript no lo soporta ningún servidor; siempre se debe compilar a javascript
// Dentro de la carpeta src crea los archivos index.ts y server.js
// Escribe el siguiente codigo para imprimir un mensaje
console.log("Desde index.ts");
/* */
// EJECUTAR EL ARCHIVO
// Escribe el comando "node src/index.ts", imprime "Desde index.ts" en la terminal de VSCode
/* */
// MODULOS
// Define una función en el archivo server.ts y luego importala y llamala
var server_1 = require("./server");
(0, server_1.sumar)();
// Si ejecutas el comando "node src/index.ts", muestra un error en la consola porque estas queriendo utilizar un "import" fuera de un modulo.
// Por lo cual deberas realizar una modificación en el archivo package.json, coloca "type": "module", quiere decir que el proyecto esta construido con modulos de ECMASCRIPT
// Pero aun no lo reconoce porque nodejs es para javascript y al habilitar "type": "module", espera un modulo con la extensión ".js" y no ".ts"
// Se tiene que agregar un interprete a node para que identifique el codigo en formato ts.
// Ingresa el comando para instalar las depedencias de desarrollo de soporte de typescript:
// npm i -D typescript ts-node
// Luego crea un archivo "tsconfig.json" al mismo nivel en el que se encuentra el archivo package.json
// El equivalente al comando "node src/index.ts" en typescript es "npx ts-node src/index.ts", npx sirve para instalar la dependencia de forma global, ts-node es el nombre de la dependencia que se encuentra en package.json
// Puedes eliminar la linea "type": "module" de package.json
// En este caso debe imprimir el mensaje y el resultado de la función
/* */
// NODEMON
// Puedes ejecutar el serivor con "npm run dev", pero cuando realizas un cambio debes volver a ejecutar ese comando
// Para tener que reiniciar el servidor de forma automatica cada vez que haya algun cambio en los archivos del codigo.
// En las versiones actuales de node existe el comando "node --watch", para observar los cambios en el archivos, pero solamente funciona con archivos javascript
// Para instalar nodemon, ingresa el comando "npm i -D nodemon"
/* */
// EJECUTAR EL SERVIDOR CON NODEMON
// En el archivo package.json, escribe lo siguiente dentro del objeto scripts
// "scripts": {
//     "dev": "nodemon --exec ts-node src/index.ts"
// },
// Al escribir el comando npm run dev ejecuta ese comando, es decir, nodemon, cada vez que realices un cambio y guardes los cambios, volvera a ejecutar el servidor.
// Si llegara a haber un error en el codigo, tambien se mostrara en la consola
/* */
// COMPILAR EL SERVIDOR PARA PRODUCCIÓN
// Al utilizar typescript en el proyecto, se tiene el comando "npx tsc src/index.ts", genera un par de archivos en la carpeta src. Toma el codigo de typescript y lo convierte a codigo javascript
// tsc sirve para compilar los archivos tal y como se encuentran, tambien se puede pasarle unas reglas para que lo compile
/* */
// REGLAS EN EL ARCHIVO tsconfig.json
// Es un archivo que sirve para definir las reglas para el compilador
// Para compilar el proyecto, escribe "npx tsc en la consola"
//# sourceMappingURL=index.js.map