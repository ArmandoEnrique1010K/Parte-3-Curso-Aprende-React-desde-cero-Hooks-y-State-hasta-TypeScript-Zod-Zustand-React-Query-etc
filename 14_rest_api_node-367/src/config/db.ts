// Los modelos son los que interactuan con los datos de la aplicación, esta sincronizado con las columnas de la base de datos

// Sequelize lo hace en automatico con la función sync (definida en server.ts)

// Instala la dependencia "npm i sequelize-typescript" para el soporte de typescript en sequelize

// Un decorador es una sintaxis que inicia con "@" en diferentes lenguajes, pero su funcionalidad es llamar a una función, agrega una función dentro de otra función que solamente habilita esa función

// Realiza el siguiente cambio para utilizar sequelize-typescript
// import { Sequelize } from "sequelize";
import { Sequelize } from "sequelize-typescript";

// Luego ve a la carpeta src y crea la carpeta models y luego crea el archivo "Product.model.ts" para el modelo de productos

import dotenv from 'dotenv'

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    // Especifica el directorio de los modelos para generar las columnas, puedes definir multiples directorios

    // "__dirname" es una función especial de Node que retorna la dirección del archivo que lo manda a llamar y se asigna la ruta y se indica a todos los archivos de la carpeta models
    models: [__dirname + '/../models/**/*.ts'],

    // Antes de ejecutar la aplicación para generar la tabla Product, ve al archivo tsconfig.json para agregar unas configuraciones
});

export default db
