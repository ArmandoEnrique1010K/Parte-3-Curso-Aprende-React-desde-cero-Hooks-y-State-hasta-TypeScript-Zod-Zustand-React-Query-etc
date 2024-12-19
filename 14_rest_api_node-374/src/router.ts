import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get('/', getProducts)

router.get('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getProductById
)

router.post('/',
  body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio'),

  body('price')
    .isNumeric().withMessage("Valor no válido")
    .notEmpty().withMessage('El precio del Producto no puede ir vacio')
    .custom(value => value > 0).withMessage("Precio no válido"),

  handleInputErrors,
  createProduct
)

// Crea un nuevo request en thunderclient para actualizar
// http://localhost:4000/api/products/1 --> tipo PUT

// El id es dinamico, se llama a la función updateProduct
router.put('/:id',
  // Valida el id, que sea de tipo entero
  param('id').isInt().withMessage('ID no válido'),

  // Aplica validaciones del router.post
  body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio'),

  body('price')
    .isNumeric().withMessage("Valor no válido")
    .notEmpty().withMessage('El precio del Producto no puede ir vacio')
    .custom(value => value > 0).withMessage("Precio no válido"),

  // El campo disponibilidad debe tener un valor de tipo boolean
  body('availability').isBoolean().withMessage('Valor para disponibilidad no válido'),

  // Llama al middleware
  handleInputErrors,

  updateProduct

  // En la respuesta se va a mostrar un arreglo de errores en el caso de que no se cumpla la validación
)

// Llama a la función updateAvailability y pasale el id dinamico
router.patch('/:id',
  // Valida el id, que sea de tipo entero
  param('id').isInt().withMessage('ID no válido'),
  // Llama al middleware
  handleInputErrors,
  updateAvailability)

// Crea un nuevo request en thunderclient para actualizar la disponiblidad
// http://localhost:4000/api/products/1 --> tipo PATCH


// Petición de tipo DELETE para borrar un registro, requiere un id dinamico
router.delete('/:id',
  // Valida el id, que sea de tipo entero
  param('id').isInt().withMessage('ID no válido'),
  // Llama al middleware
  handleInputErrors,
  // Llama a la función deleteProduct
  deleteProduct
)

export default router