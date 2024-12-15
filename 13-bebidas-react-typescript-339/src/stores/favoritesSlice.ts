// Slice para favoritos (es parte del store global)

import { StateCreator } from "zustand";
import { Recipe } from "../types";

// Importa createRecipeSlice para acceder a los metodos de ese slice
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice";

// type para este slice
export type FavoritesSliceType = {
    // Los favoritos son un arreglo del type Recipe (recetas)
    favorites: Recipe[]
    // La función para agregar una receta, requiere un parametro y no retorna nada
    handleClickFavorite: (recipe: Recipe) => void
    // Para verificar si existe una receta, requiere un parametro y retorna un booleano
    favoriteExists: (id: Recipe['idDrink']) => boolean
    // El type para loadFromStorage, es una función que no retorna nada
    loadFromStorage: () => void
}

// Crea un state global para los favoritos con StateCreator y se asigna el type FavoritesSliceType

// Requiere las funciones set y get como parametro para modificar y obtener el state

// Adicionalmente se pasa el parametro api
// export const createFavoriteSlice: StateCreator<FavoritesSliceType> = (set, get, api) => ({

// Realiza el mismo procedimiento al asignar el type que se traera del otro slice
export const createFavoriteSlice: StateCreator<FavoritesSliceType & RecipesSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({

    // Estado inicial de favorites
    favorites: [],

    // Función para agregar una receta
    handleClickFavorite: (recipe) => {
        // console.log(recipe)

        // Obten el state de favorites llamando a la función get
        // console.log(get().favorites)

        // Comprueba que la receta que se encuentra en el state favorites exista en el arreglo (con el metodo some, se verifica por su id)
        // if (get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)) {

        // Para evitar repetir el codigo se llama a la función de favoriteExists y se pasa idDrink como el id
        if (get().favoriteExists(recipe.idDrink)) {
            // Imprimira este mensaje si haces clic en el botón de "Agregar a favoritos" 2 veces
            // console.log("Si existe...")

            // Se elimina de favorites

            // Utiliza el metodo filter en el state de favorites para filtrar todos los favoritos a excepción del favorito cuyo id coincida con el id de la receta que se envia 
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
        } else {
            // console.log("No existe...")

            // Escribe en el state de favorites
            // Primera forma, obtiene los datos y no pierde la referencia

            // set({
            //     // Utiliza un operador Spread para obtener las recetas favoritas en ese momento y luego agrega la nueva receta
            //     favorites: [...get().favorites, recipe]
            // })


            // Segunda forma, sin utilizar la función get, toma el state completo de la aplicación como callback y recupera los valores
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))

            // Cualquiera de las 2 formas son buenas practicas
        }
        // Llama a createRecipeSlice pasando 3 argumentos para tener acceso a los metodos, en este caso para cerrar la ventana modal
        createRecipeSlice(set, get, api).closeModal()

        // Llama a localStorage para almacenar los favorites almacenados en el state
        localStorage.setItem('favorites', JSON.stringify(get().favorites))

        // Pulsa F12 en Chrome, ve a la pestaña applicaction, en el panel izquierdo elige localStorage y observa que se guardan los favoritos

        // Un error en el parametro set indica que no es compatible el partial que se pasa entre ambos slices, por lo tanto se tiene que realizar modificaciones en createRecipesSlice y createFavoritesSlice

        // Puede que sea una solución NO recomendada modificar ambos slices
    },

    // Función para verificar que exista un favorito, se utiliza en la ventana modal
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    // Función para obtener los favoritos de localStorage
    loadFromStorage: () => {
        // Se obtiene los favoritos con getItem y su key
        const storedFavorites = localStorage.getItem("favorites")

        // Si hay elementos en storedFavorites
        if (storedFavorites) {
            set({
                // Se convierte de string a JSON el contenido de storedFavorites y se almacena en el state favorites
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})

// Pulsa F12 en Chrome, ve a la pestaña Redux y debe mostrar el state de favorites, al agregar un favorito, se agrega en el state como un objeto

// SLICE PATTERN: Es el patrón de los Slices