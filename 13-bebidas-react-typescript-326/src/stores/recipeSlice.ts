import { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/RecipeService"
import type { Categories, Drinks, SearchFilter } from "../types"

export type RecipesSliceType = {
    categories: Categories
    // Establece el type Drinks para las bebidas
    drinks: Drinks,

    fetchCategories: () => Promise<void>
    // Modifica el type, requiere un parametro searchFilters de tipo SearchFilter
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
}

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    // Establece el state drinks, un objeto que contiene un arreglo drinks, similar al esquema Drinks.
    drinks: {
        drinks: []
    },

    fetchCategories: async () => {
        const categories = await getCategories()

        set({
            categories
        })
    },
    // Función asincrona para buscar las recetas, requiere un parametro
    searchRecipes: async (filters) => {
        // console.log('Desde recipeSlice')

        // Imprime el ingrediente y la categoria
        // console.log(filters)

        // Espera a que llame a la función getRecipes
        const drinks = await getRecipes(filters);
        // console.log(drinks)

        // Escribe en el state de drinks
        set({
            // drinks: drinks
            drinks
        })

        // Puedes verificar en el state de drinks en Redux desde las herramientas de desarrollo de chrome, luego de enviar el formulario con los campos rellenados
    }
})