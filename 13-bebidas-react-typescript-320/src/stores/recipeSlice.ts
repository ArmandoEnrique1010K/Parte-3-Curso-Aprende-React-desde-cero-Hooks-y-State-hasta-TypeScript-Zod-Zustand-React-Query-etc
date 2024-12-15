import { StateCreator } from "zustand"
import { getCategories } from "../services/RecipeService"
import type { Categories } from "../types"

// Define los types
// type Category = {}

export type RecipesSliceType = {
    // categories: Category[]
    categories: Categories
    fetchCategories: () => Promise<void>
}

// Slice para las recetas (una parte del store)
// Se tiene el type StateCreator para crear el state, luego se tiene que especificar un type para el autocompletado

// No olvidar especificar las 3 funciones en el parametro de la función de flecha (opcional)
export const createRecipeSlice: StateCreator<RecipesSliceType> = (set /*, get, api */) => ({
    // State de categories
    // categories: [],
    categories: {
        drinks: []
    },
    // Acción para obtener las categorias
    fetchCategories: async () => {
        // Llama a la función creada en RecipeService
        const categories = await getCategories()

        // Imprime las categorias que se obtienen desde recipeSlice (este componente)
        // console.log(categories)

        // Para escribir en el state de categories, utiliza la función set
        set({
            // categories: categories
            categories
        })
    }
})