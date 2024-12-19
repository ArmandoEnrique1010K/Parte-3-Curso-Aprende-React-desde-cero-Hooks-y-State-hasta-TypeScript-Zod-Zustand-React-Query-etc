// Importa los decoradores de sequelize-typescript
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

// El decorador @Table define una tabla, con un objeto con opciones
@Table({
    // Nombre de la tabla
    tableName: 'products'
})

// Model es una clase que se puede heredar y en ella se puede escribir y definir el modelo
class Product extends Model {
    // Define los atributos que tendra un producto

    // Usualmente el id te lo da una base de datos una vez que generas un registro
    // id

    // @Column sirve para definir una columna, define las columnas de la tabla Product para generarlas en la base de datos 
    @Column({
        // Define el tipo de dato, aparte del type asignado en name, el tipo CHAR es similar a un string y sirve para establecer 100 caracteres (lo puede complementar con espacios en blanco), pero el tipo STRING establece el numero máximo de caracteres que se va a introducir
        type: DataType.STRING(100)
    })
    name: string

    @Column({
        // DataType.FLOAT sirve para asignar un numero de tipo decimal, puedes establecerle la cantidad de cifras enteras y decimales
        type: DataType.FLOAT(6, 2)
    })
    price: number

    // Coloca un valor por defecto
    @Default(true)
    @Column({
        // Obviamente DataType.BOOLEAN es el de tipo boolean
        type: DataType.BOOLEAN
    })
    availability: boolean


}

// Exporta Product
export default Product

// Para agregar el modelo y generar todas las columnas definidas, ve al archivo db.ts

// Existen otros decoradores como:
// Default ---> valor por defecto si no se pasa ningun valor
// PrimaryKey ---> llave primaria
// HasMany / HasOne / HasAssociation ---> para relacionar los datos

/* */

// Abre DBeaver, en el panel izquierdo luego de haberse conectado a la base de datos, ve a la carpeta "tablas", haz clic derecho, selecciona "Refresh" y observa que se muestra una tabla "products" con las columnas definidas en este model

// Una advertencia es que PostgreSQL no soporta el tipo de dato FLOAT con decimales, el siguiente enlace contiene los tipos de datos en Sequelice y su respectiva transformación en el motor de la base de datos

// https://sequelize.org/docs/v7/models/data-types/