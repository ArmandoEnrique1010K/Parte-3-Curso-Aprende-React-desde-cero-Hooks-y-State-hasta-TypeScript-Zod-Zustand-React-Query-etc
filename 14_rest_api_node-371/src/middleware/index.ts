// NextFunction es el type para la función next
import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

// Si un archivo lleva el nombre "index.ts" no hace falta importar el nombre del archhivo

// Este archivo contiene los middlewares


// MIDDLEWARE EN NODE.JS

// En Node.js, el middleware se refiere a un tipo de software intermedio que se utiliza para procesar las solicitudes HTTP que llegan a una aplicación web antes de ser manejadas por la función de enrutamiento principal

// Los middleware son funciones que se ejecutan en el medio del flujo de solicitud y respuesta de una aplicación web y pueden realizar diversas tareas como autenticación, validación de datos, registrosde solicitudes, comprensión de respuestas, entre otras.

// Los middleware en Node.js son esenciales para la creación de aplicaciones web robustas y flexibles. Cada solicitud HTTP pasa a través de una serie de middleware antes de llegar a la función de controlador que maneja la solicitud final

// Esto permite modularizar y organizar el código de manera efectiva, ya que puedes agregar o quitar middleware según las necesidades de tu aplicación

/* */

// Asigna los types para evitar los anys en typescript
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    console.log("Desde MiddleWare")

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })

        return
    }

    // La función next quiere decir que ha terminado la ejecución de la función handleInputErrors
    next()

    // Si no llamas a la función next, entonces la ejecución del codigo finalizara aqui
}