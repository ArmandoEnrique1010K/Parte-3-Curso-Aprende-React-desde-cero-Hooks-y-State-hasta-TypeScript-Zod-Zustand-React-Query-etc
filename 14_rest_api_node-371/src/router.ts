import { Router } from "express"
import { createProduct, getProductById, getProducts } from "./handlers/product";
// Importa body y param de express-validator
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

// En lugar de definir la función, llama a la función getProduct para obtener todos los productos 

// router.get('/', (req, res) => {
//   res.json('Desde GET')
// })

router.get('/', getProducts)
// http://localhost:4000/api/products

// Puedes guardar una request en thunderclient hacia una colección, clic derecho en el panel izquierdo > "Save to Collection", asignale un nombre y selecciona una colección

/* */

// Ruta dinamica para obtener un producto por su id (se encuentra en la tabla products)

// Utiliza un routing dinamico con un parametro ":id"
router.get('/:id',

  // Valida que el id sea un numero entero
  param('id').isInt().withMessage('ID no válido'),

  // Puedes realizar una petición de tipo GET a http://localhost:4000/api/products/hola


  // Reutiliza el middleware
  handleInputErrors,

  // Llama a la función getProductById
  getProductById
)
// http://localhost:4000/api/products/1

// Recuerda que puedes cancelar el request en thunderclient si solamente imprime algo en la consola haciendo clic en "Cancel Request"

/* */

// Se tiene que validar en el router para que el codigo quede más limpio

router.post('/',
  // Coloca aqui las reglas de validación, router no es una función asincrona, 

  // check se utiliza en funciones asincronas y body se utiliza en funciones que no son asincronas. Tambien se elimina "run(req)"
  body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio'),

  // Separa las funciones con una coma, ejecuta las funciones en orden porque lo detecta como un objeto?
  body('price')
    .isNumeric().withMessage("Valor no válido")
    .notEmpty().withMessage('El precio del Producto no puede ir vacio')
    .custom(value => value > 0).withMessage("Precio no válido"),

  // Función intermedia (middleware) que se ejecuta en el request de tipo HTTP
  handleInputErrors,

  createProduct
)

// Realiza una prueba en thunderClient
// Petición de tipo POST a: http://localhost:4000/api/products

router.put('/', (req, res) => {
  res.json('Desde PUT')
})

router.patch('/', (req, res) => {
  res.json('Desde PATCH')
})

router.delete('/', (req, res) => {
  res.json('Desde DELETE')
})

export default router