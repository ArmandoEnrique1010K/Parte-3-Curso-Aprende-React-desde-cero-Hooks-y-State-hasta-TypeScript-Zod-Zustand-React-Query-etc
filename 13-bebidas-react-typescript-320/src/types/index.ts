import { z } from 'zod';
import { CategoriesAPIResponseSchema } from '../utils/recipes-schema';

// Define el type Categories en base a la respuesta, lo infiere el esquema de CategoriesAPIResponseSchema
export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
