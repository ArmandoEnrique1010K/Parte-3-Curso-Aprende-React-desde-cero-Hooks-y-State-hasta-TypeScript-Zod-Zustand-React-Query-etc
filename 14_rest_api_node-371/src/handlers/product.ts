import { Request, Response } from "express"
// import { check, validationResult } from "express-validator";
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {

    // Traslada las validaciones hacia router.ts
    // await check('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio').run(req)

    // await check('price')
    //     .isNumeric().withMessage("Valor no válido")
    //     .notEmpty().withMessage('El precio del Producto no puede ir vacio')
    //     .custom(value => value > 0).withMessage("Precio no válido")
    //     .run(req)

    // Traslada esto al middleware
    // let errors = validationResult(req)

    // if (!errors.isEmpty()) {
    //     res.status(400).json({
    //         errors: errors.array()
    //     })

    //     return
    // }

    // Puedes utilizar el bloque try-catch

    try {
        // Traslada aqui lo que se va a ejecutar 
        const product = await Product.create(req.body)

        res.json({
            data: product
        })
    } catch (error) {
        // Imprime el error
        console.log(error)
    }

}

// En Dbeaver, en el panel izquierdo puedes eliminar una tabla, clic derecho en la tabla products, selecciona delete y luego vuelve a ejecutar el servidor para poder generar las tablas con su estructura.

// Luego puedes insertar productos a la tabla realizando peticiones de tipo POST a la URL http://localhost:4000/api/products

// Ejemplo del objeto JSON que se va a enviar

/*
{
  "name": "Mouse",
  "price": 50
}
*/


/* */

// Función intermedia para obtener todos los productos
export const getProducts = async (req: Request, res: Response) => {
    // console.log("Desde GET")

    try {
        // Para obtener los datos, utiliza el metodo findAll del modelo Product
        // const products = await Product.findAll();

        // Puedes alterar el orden
        const products = await Product.findAll({
            order: [
                // Order descendente segun el id
                ['id', 'DESC']

                // "ASC" es en orden ascendente (por defecto)

                // Un ORM evita escribir ORDER BY,
            ],
            // Puedes limitar los registros (trae 10 registros como maximo)
            // limit: 10

            // Puedes excluir ciertas propiedades de los objetos que se obtienen en la respuesta
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'availability']
            }
        });

        // Accede a los datos, trae todos los productos como un arreglo de objetos
        res.json({
            data: products
        })
    } catch (error) {
        // Imprime el mensaje de error
        console.log(error)
    }
}

/* */

// Función intermedia para obtener un producto por su ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        console.log('desde getProductById')

        // Imprime el parametro que se pasa desde la URL ":id"
        console.log(req.params.id)

        // Desestructura id de req.params
        const { id } = req.params

        // findByPk sirve para buscar por su id (llave primaria)
        const product = await Product.findByPk(id)

        // Si no hay un producto, muestra un error 404 y detiene la ejecución del codigo
        if (!product) {
            res.status(404).json({
                error: "Producto No Encontrado"
            })

            return

            // Realiza una petición de tipo GET a la URL y retorna el mensaje de error en la respuesta
            // http://localhost:4000/api/products/400
        }

        // Muestra el producto encontrado en la respuesta
        res.json({
            data: product
        })
    } catch (error) {
        console.log(error)
    }
}
