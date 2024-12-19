// Importa las interfaces request y response 
import { Request, Response } from "express"

// Importa este par de funciones de express validator
import { check, validationResult } from "express-validator";

// check es para validar un campo
// validationResult es el resultado de la validación

// Importa el modelo
import Product from "../models/Product.model";


// Función para crear un producto, asignale el type a los parametros req y res para obtener el autocompletado en el codigo

// Las funciones deben ser asincronas porque en lo que hace la consulta a la base de datos se tarda y con una función asincrona se hace que se detenga el codigo hasta que se tenga un resultado
export const createProduct = async (req: Request, res: Response) => {
    /* */

    // Utiliza validación con la función check, coloca el nombre del campo, puedes encadenar diferentes funciones (reglas de validación)

    // notEmpty revisa que el valor de name no este vacio, puedes seguir concatenando más reglas. withMessage encadena un mensaje de validación y run(req) recupera el dato que fue enviado al servidor para la valicación
    await check('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio').run(req)

    // Valida el campo price, adiciona una validación para que acepte valores numericos
    await check('price')
        .isNumeric().withMessage("Valor no válido")
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        // custom sirve para una validación personalizada, si el valor del precio no es mayor que cero
        .custom(value => value > 0).withMessage("Precio no válido")
        .run(req)

    // Llama a la función validationResult para recuperar los mensajes de errores y utilizar la validación
    let errors = validationResult(req)

    // Si hay mensajes de errores (se niega la función isEmpty)
    if (!errors.isEmpty()) {
        // res.status(400) muestra un error cuando envias un request incorrecto y json sirve para mostrar un objeto, en este caso con los mensajes de errores
        res.status(400).json({
            errors: errors.array()
        })

        // Evita crear el producto
        return
    }

    /* */

    // Crea el objeto de tipo Product utilizando el constructor Product (definido en el modelo) y lo almacena en la base de datos
    // const product = new Product(req.body)

    // save almacena en la base de datos
    // product.save();

    // Utiliza un await para esperar que se almacene el producto
    // const savedProduct = await product.save()

    // El codigo anterior se elimina porque se utiliza el metodo create del model

    // Existe el metodo create de la instancia del modelo Product, crea la instancia en la base de datos y lo almacena en un solo paso
    const product = await Product.create(req.body)

    /* */

    // Nota: Todo lo que se envia el request se puede mostrar utilizando. Si no se envia nada, muestra undefined
    // console.log(req.body);

    // En el archivo "tsconfig.json", coloca la propiedad "target": "ESNext", la versión de javascript que se va a compilar, en ese caso se establece la versión proxima

    // Además las propiedades "moduleResolution": "NodeNext" y "module": "NodeNext" en "tsconfig.json"

    // Ahora puedes enviar la petición de tipo POST y luego verifica en Dbeaber que se ha agregado un nuevo registro a la tabla Product, (en el panel izquierdo, clic en la tabla products y selecciona "ver datos")

    // En lugar de retornar un string, puedes retornar un objeto, en este caso el producto que se subio a la base de datos
    // res.json('Desde POST')

    // res.json({
    //     data: product
    // })

    // Luego de realizar la petición se ve que se tiene lo siguiente

    /*
    {
        "data": {
            "availability": true,
            "id": null,
            "name": "Monitor Curvo 34 Pulgadas",
            "price": 300,
            "updatedAt": "2024-12-18T05:35:56.854Z",
            "createdAt": "2024-12-18T05:35:56.854Z"
        }
    }
    */

    // Observa que tiene un id igual a null, una solución es definir una función asincrona (savedProduct) para esperar que primero guarde el producto en la base de datos y luego obtener el id

    // En lugar de utilizar esto
    // res.json({
    //     data: savedProduct
    // })

    // Vuelve a realizar la petición y muestra el id en el objeto devuelto

    res.json({
        // Vuelve a asignar product
        data: product
    })

    /* */

    // Envia un objeto JSON con un campo vacio, 
    // http://localhost:4000/api/products

    /*
    {
      "name": "",
      "price": 300,
    }
    */

    // Puedes ver que lo envia a la base de datos
    // Los ORMs se encarga de limpiar los datos, evita las inyecciones SQL, se tiene que validar para que no entre datos vacios

    // Instala la dependencia express validator con el comando "npm i express-validator", puedes aplicar en el controlador o en la función createProduct, en este contexto.
}