import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponse } from "../utils/recipes-schema"
import { SearchFilter } from "../types"

export async function getCategories() {

    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"

    const { data } = await axios(url)

    const result = CategoriesAPIResponseSchema.safeParse(data)

    if (result.success) {
        return result.data
    }
}

// Función para obtener las recectas en base al ingrediente y categoria
export async function getRecipes(filters: SearchFilter) {
    // console.log(filters);

    // Se utiliza el endpoint de la API 

    // Recuerda que se utiliza la API de the cocktailDB: https://www.thecocktaildb.com/api.php

    // Existen endpoint de tipo search para buscar por nombre, lookup para obtener uno solo y filters para buscar por un ingrediente, categoria, etc.

    // Observa que estos 2 endpoints (para buscar por ingrediente y categoria) tienen algo en común:
    // www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
    // www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink

    // Uno utiliza un query "i" y el otro un "c", se puede combinar esos 2 querys

    // Define la url dinamica con 2 parametros que se obtienen del state (utiliza & para agregar un segundo query) y no olvidar colocar "https://" al inicio de la url
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`

    // Utiliza axios para realizar una petición y obtener la data de la respuesta
    const { data } = await axios(url)
    // console.log(data)

    // Imprime un arreglo que contiene objetos, contiene las propiedades "idDrink", "strDrink" y "strDrinkThumb", se tiene que definir un esquema para la respuesta en recipes-schema

    // Establece el esquema de DrinksAPIResponse en la data de la respuesta
    const result = DrinksAPIResponse.safeParse(data);

    // Recuerda que debe imprimir "success.true" para obtener los datos
    // console.log(result)

    // Devuelve la data
    if (result.success) {
        return result.data
    }
}