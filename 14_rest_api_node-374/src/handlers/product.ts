import { Request, Response } from "express"
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)

        res.json({
            data: product
        })
    } catch (error) {
        console.log(error)
    }

}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['id', 'DESC']
            ],

            attributes: {
                exclude: ['createdAt', 'updatedAt', 'availability']
            }
        });

        res.json({
            data: products
        })
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            res.status(404).json({
                error: "Producto No Encontrado"
            })

            return
        }

        res.json({
            data: product
        })
    } catch (error) {
        console.log(error)
    }
}

// Función para actualizar el producto
export const updateProduct = async (req: Request, res: Response) => {

    // res.json("Desde PUT")

    // Primero revisa de que el producto exista (reutiliza el codigo en la función getProductById)
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: "Producto No Encontrado"
        })

        return
    }


    // Actualizar el producto

    // Al enviar una petición de tipo PUT a http://localhost:4000/api/products/1, envia el siguiente JSON (sección body)

    /*
    {
        "name": "Monitor Nuevo - Actualizado",
        "price": 400,
        "availability": true
    }
    */

    // Imprime el objeto JSON que se envia en la petición
    // console.log(req.body)

    // Utiliza el metodo update en product para actualizar y pasale el body
    await product.update(req.body)

    // save sirve para almacenar en la base de datos
    await product.save()

    // Puedes revisar en Dbeaver que el producto se ha actualizado y en la respuesta, se obtiene "updatedAt" para la fecha de actualización

    // PUT es un metodo que hace modificaciones totales sobre un registro, si solamente pasas unas propiedades, los cambios se aplican a esas propiedades. Pero junto con el metodo update hace modificaciones parciales (puedes omitir las propiedades en el objeto JSON)

    // Para hacerlo sin el metodo update, puedes optar por:
    // product.name = req.body.name
    // product.price = req.body.price
    // product.availability = req.body.availability
    // await product.save()

    // En ese caso, si olvidas definir una propiedad en el objeto JSON que se va a enviar con la petición, destruye o elimina el contenido que se tiene en ese campo, los cambios aplican a todos esos campos


    // En la respuesta se muestra el produto existente
    res.json({
        data: product
    })
}

// Función para actualizar la disponibilidad (es similar a la función de updateProduct)
export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: "Producto No Encontrado"
        })

        return
    }

    // update solamente actualiza lo que le mande en el objeto JSON

    // PUT reemplaza el elemento con el que le envies
    // await product.update(req.body)

    // Si quieres actualizar solamente la cantidad
    // product.availability = req.body.availability

    // Al enviar una petición de tipo PATCH a http://localhost:4000/api/products/1, envia el siguiente JSON (sección body)

    /*
    {
      "availability": true
    }
    */

    // Solamente cambia ese campo
    // await product.save()


    // Imprime la respuesta en la consola, lee los valores
    // console.log(product.dataValues)

    // Imprime el valor de la disponibilidad
    // console.log(product.dataValues.availability)

    // En lugar de pasarle un objeto JSON con la disponibilidad, puedes optar por invertir el valor actual de la disponibilidad
    product.availability = !product.dataValues.availability

    // Recuerda que al final se tiene que guardar los cambios en la base de datos
    await product.save()

    res.json({
        data: product
    })
}


// PUT Y PATCH, CUANDO UTILIZAR CADA UNO

// ¿QUE HACE PUT?

// El metodo PUT se utiliza para actualizar o reemplazar completamente un recurso existente en un servidor web

// Cuando haces una solicitud PUT, estás diciendo al servidor que tome la información proporcionada y la utilice para reemplazar completamente el recurso en la ubicación especificada

// Por ejemplo, si tienes un objeto JSON que representa un producto y haces una solicitud PUT al servidor con ese objeto, el servidor reemplazará completamente los datos del producto existente con los datos proporcionados en la solicitud PUT

// ¿QUE HACE PATCH?

// PATCH se utiliza para realizar modificaciones parciales en un recurso existente en un servidor web

// En lugar de reemplazar completamente el recurso, como lo hace PUT, PATCH permite realizar cambios específicos en los datos del recurso sin afectar el resto de la información

// Por ejemplo, si tienes un objeto JSON que representa un producto y haces una solicud PATCH al servidor con una pequeña parte de los datos actualizados (por ejemplo, cambiar solo disponibilidad), el servidor aplicará esos cambios sin afectar otros detalles del producto

/* */

// Función para eliminar un producto
export const deleteProduct = async (req: Request, res: Response) => {
    // Busca el producto por su id
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: "Producto No Encontrado"
        })

        return
    }

    // Envia una petición de tipo DELETE a http://localhost:4000/api/products/1,

    // El metodo destroy, elimina el registro de la base de datos
    await product.destroy()

    // Muestra un mensaje en la respuesta
    res.json({
        data: "Producto Eliminado"
    })

    // En DBeaver, puedes hacer clic derecho en la tabla y seleccionar "refresh" para ver los cambios realizados en la tabla como eliminar un registro desde el servidor
}

// Por lo general en proyectos se utiliza una columna llamada visible de tipo boolean, para eliminar los registros, solamente cambiando el valor a false, luego para obtener todos los registros solamente se muestran los que tienen el valor true en el campo visible. Porque destroy elimina el registro de forma permanente