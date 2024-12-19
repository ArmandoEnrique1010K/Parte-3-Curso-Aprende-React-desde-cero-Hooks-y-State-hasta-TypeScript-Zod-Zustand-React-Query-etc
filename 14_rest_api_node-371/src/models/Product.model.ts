import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'products'
})

class Product extends Model {
    @Column({
        type: DataType.CHAR(100)
    })

    // Coloca "declare" antes del nombre del campo
    // name: string
    declare name: string

    @Column({
        type: DataType.FLOAT(6, 2)
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Product


// (sequelize) Warning: PostgreSQL does not support FLOAT with decimals. Plain `FLOAT` will be used instead.

// Ese mensaje de error se muestra porque no se ha colocado un declare antes del nombre del campo
