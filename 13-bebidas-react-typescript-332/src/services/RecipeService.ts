import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema"
import { Drink, SearchFilter } from "../types"

export async function getCategories() {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    const { data } = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)

    if (result.success) {
        return result.data
    }
}

export async function getRecipes(filters: SearchFilter) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`

    const { data } = await axios(url)
    const result = DrinksAPIResponse.safeParse(data);

    if (result.success) {
        return result.data
    }
}

// Función para obtener una receta por su id
export async function getRecipeById(id: Drink['idDrink']) {
    // console.log(id)

    // Utiliza el endpoint de la API de https://www.thecocktaildb.com/api.php para obtener la receta por el id de la bebida

    // Se utiliza una url dinamica, inyecta el id en la url
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`

    // Obten los datos de la respuesta con axios
    const { data } = await axios(url);
    // console.log(data)

    // Al hacer clic en el botón "ver receta", imprime un objeto que contiene drinks (un arreglo con un unico objeto como elemento). El objeto contiene varias props que representan los datos de la receta como ingredientes y cantidades (maximo 15 de cada uno de ellos), instrucciones de preparación, etc.

    // Establece el esquema RecipeAPIResponseSchema en la data de la respuesta con "data.drinks[0]" para establecer el primer elemento del arreglo (el objeto que contiene los datos de la receta)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    // console.log(result)

    // Retorna la data del objeto result
    if (result.success) {
        return result.data
    }

}