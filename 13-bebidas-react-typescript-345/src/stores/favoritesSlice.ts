import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice";
import { createNotificationSlice, NotificactionSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

// Añade el type NotificactionSilceType con un operador &
export const createFavoriteSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificactionSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if (get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))

            // Luego de eliminar una receta, se muestra una notificación llamando a createNotificationSlice, precisamente la función showNotificaction

            // Pasa las funciones set, get y api como argumento de createNotificationSlice

            createNotificationSlice(set, get, api).showNotificaction({
                // Se establece las propiedades del objeto que se va a pasar
                text: 'Se elimino de favoritos',
                error: false
            })


        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))

            // Luego de agregar una receta, se mostrara otra notificación, realiza el mismo procedimiento
            createNotificationSlice(set, get, api).showNotificaction({
                text: 'Se agrego a favoritos',
                error: false
            })
        }

        createRecipeSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem("favorites")

        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})