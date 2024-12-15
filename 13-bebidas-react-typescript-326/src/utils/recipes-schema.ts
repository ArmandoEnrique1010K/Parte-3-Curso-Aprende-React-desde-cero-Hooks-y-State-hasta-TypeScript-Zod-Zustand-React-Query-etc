import { z } from 'zod'

export const CategoriesAPIResponseSchema = z.object({
    drinks: z.array(
        z.object({
            strCategory: z.string()
        })
    )
})


// Define un nuevo schema para la busqueda de recetas (la estructura esta definida en el state de searchFilters en Header.tsx)
export const SearchFilterSchema = z.object({
    ingredient: z.string(),
    category: z.string()
})


// Crea 2 esquemas para la respuesta de la API (se tiene en cuenta la practica de utilizar singular y plural para un objeto y arreglo)
export const DrinkAPIResponse = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string()
})

// Este esquema se tiene que utilizar para la respuesta
export const DrinksAPIResponse = z.object({
    drinks: z.array(DrinkAPIResponse)
})

