import { z } from 'zod'

// Define el esquema (schema) para la recetas
// Ten en cuenta el objeto que se obtiene al llamar a la URL: https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list
export const CategoriesAPIResponseSchema = z.object({
    drinks: z.array(
        z.object({
            strCategory: z.string()
        })
    )
})