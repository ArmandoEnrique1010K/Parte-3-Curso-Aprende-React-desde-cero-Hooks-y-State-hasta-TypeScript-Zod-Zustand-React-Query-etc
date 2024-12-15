import { z } from 'zod';
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, SearchFilterSchema } from '../utils/recipes-schema';

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>

// Define el type para la busqueda de recetas, lo infiere de SearchFilterSchema
export type SearchFilter = z.infer<typeof SearchFilterSchema>

// Infiere el esquema de DrinksAPIResponse para el type Drinks
export type Drinks = z.infer<typeof DrinksAPIResponse>

// Type para que infiera el esquema de DrinkAPIResponse (en singular)
export type Drink = z.infer<typeof DrinkAPIResponse>