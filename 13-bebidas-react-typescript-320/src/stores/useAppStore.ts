// COMO CREAR MULTIPLES STORES EN ZUSTAND
/*
  Conforme tus apps van creciendo o son más complejas, tu store también puede crecer.

  Existen 2 opciones para manejar múltiples store: crear diferentes stores o dividirlos utilizandoo el Slice Pattern.

  Slice Pattern es algo que también encuentras en Redux Toolkit y es una forma de dividir tus stores en pequeñas piezas y unirlas en un store principal.

  Recuerda primero instalar zustand con "npm i zustand"
*/

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipeSlice, RecipesSliceType } from './recipeSlice';

// Este store va a englobar toda la aplicación, genera un store grande conformado por 3 stores: favoritos, notificaciones y recetas

// Recuerda la función create de zustand para crear el store
// La función set permite escribir en el state, para pasarlo a los slices, se tiene el parametro "...a" para que tome una copia de todos los argumentos como las funciones set, get y api

// Tambien se tiene que especificar un type para la función create
// No olvidar la función devtools para utilizar Redux y visualizar el estado actual en las herramientas de desarrollo de Chrome
export const useAppStore = create<RecipesSliceType>()(devtools((...a) => ({
  // Llama a la función createRecipeSlice, coloca un operador spread para que tome una copia

  // Pasa el argumento ...a
  ...createRecipeSlice(...a)

  // Un error es que espera 3 argumentos: set, get y api en el componente createRecipesSlice
})))
