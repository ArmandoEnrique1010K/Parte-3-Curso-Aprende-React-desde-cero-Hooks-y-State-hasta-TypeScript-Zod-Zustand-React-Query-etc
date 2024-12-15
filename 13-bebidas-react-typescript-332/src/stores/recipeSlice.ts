import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"

export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks,
    // type para la receta seleccionada
    selectedRecipe: Recipe,
    // type para la ventana modal
    modal: boolean,
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    // type para la función para tomar el id y colocarlo en el state como la receta que se va a obtener, se establece el type para el id
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    // type para la función de cerrar la ventana modal
    closeModal: () => void
}

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    // Valor inicial para el state de selectedRecipe, escribir cada propiedad del schema RecipeAPIResponseSchema en recipes-schema puede sonar exagerado, por lo cual se utiliza un objeto vacio y lo establece como un type Recipe
    selectedRecipe: {} as Recipe,
    // Valor inicial para el modal
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()

        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters);

        set({
            drinks
        })
    },
    // Define la función asincrona selectRecipe, porque interactua con la API, requiere un argumento (el id)
    selectRecipe: async (id) => {
        // console.log("Desde selectRecipe")
        // console.log(id)

        // Espera a que llame a la función getRecipeById pasando el id como argumento
        const selectedRecipe = await getRecipeById(id);

        // Ahora imprime solamente un objeto con los datos de la receta
        // console.log(selectedRecipe)
        set({
            // Establece la receta seleccionada
            // selectedRecipe: selectedRecipe
            selectedRecipe,
            // modal pasa a ser true
            modal: true
        })

        // Haz clic en el boton ver receta, pulsa F12 en Chrome, ve a la pestaña Redux y en el ultimo cambio del state se establece los datos de la receta (state de selectedRecipe) y el modal cambia a true
    },
    // Función para cerrar la ventana modal, cambia el state de modal a false y limpia los datos de la receta seleccionada
    closeModal: () => {
        set({
            modal: false,
            // Coloca "as Recipe" para no definir cada una de las propiedades del type Recipe y sus valores iniciales
            selectedRecipe: {} as Recipe
        })
    }

    // Con Redux puedes ver que los state de modal y selectedRecipe cambian al cerrar la ventana modal
})