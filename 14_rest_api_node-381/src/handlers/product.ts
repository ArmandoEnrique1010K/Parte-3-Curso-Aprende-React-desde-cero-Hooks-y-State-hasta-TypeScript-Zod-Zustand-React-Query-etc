import { Request, Response } from "express"
import Product from "../models/Product.model";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)

        // Correción, debe retornar un status 201 porque el estado para un recurso creado
        res.status(201).json({
            data: product
        })

        // La siguiente pagina contiene los codigos de los status
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
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

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: "Producto No Encontrado"
        })

        return
    }

    await product.update(req.body)
    await product.save()

    res.json({
        data: product
    })
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: "Producto No Encontrado"
        })

        return
    }

    product.availability = !product.dataValues.availability

    await product.save()

    res.json({
        data: product
    })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: "Producto No Encontrado"
        })

        return
    }

    await product.destroy()

    res.json({
        data: "Producto Eliminado"
    })

}