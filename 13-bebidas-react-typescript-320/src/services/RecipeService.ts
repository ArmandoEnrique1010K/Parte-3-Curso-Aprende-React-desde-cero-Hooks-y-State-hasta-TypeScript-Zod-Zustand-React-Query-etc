// Se tiene en cuenta la siguiente API:
// https://www.thecocktaildb.com/api.php

// Contiene multiples endpoints, como listar todas las categorias llamando al endpoint:
// https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list

// El endpoint muestra un objeto que contiene la propiedad drinks que contiene un arreglo de objetos que llevan la propiedad strCategory para el nombre de la categoria

// Tambien se tiene que definir el esquema para las categorias en la carpeta utils, archivo recipes-schema

// Instala axios y zod con el comando "npm i axios zod"
import axios from "axios"
import { CategoriesAPIResponseSchema } from "../utils/recipes-schema"

// Este componente contiene los llamados a la API

// Función asincrona para obtener las categorias
export async function getCategories() {

    // console.log('desde RecipeService')

    // Contiene la URL de la API
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"

    // Desestructura la propiedad data para obtener directamente los datos de la respuesta
    const { data } = await axios(url)

    // Imprime las categorias
    // console.log(data)

    // Pasale el esquema para que lo valide
    const result = CategoriesAPIResponseSchema.safeParse(data)

    // Debe imprimir "success: true" para que muestre la data, de lo contrario no mostrara la data si imprime "success: false" debido a que no esta bien definido el esquema
    // console.log(result)

    // La función solamente devolvera la data si la propiedad result es true
    if (result.success) {
        return result.data
    }

}