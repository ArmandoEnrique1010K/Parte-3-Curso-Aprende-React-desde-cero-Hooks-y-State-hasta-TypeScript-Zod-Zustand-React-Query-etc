import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipeSlice, RecipesSliceType } from './recipeSlice';

// Importa el slice de favorites y su type desde favoritesSlice
import { createFavoriteSlice, FavoritesSliceType } from './favoritesSlice';

// Agrega un segundo type: FavoriteSliceType, utiliza el caracter & para generar una unión entre ambos types y no | para utilizar uno de ellos
export const useAppStore = create<RecipesSliceType & FavoritesSliceType>()(devtools((...a) => ({
  ...createRecipeSlice(...a),
  // Duplica la linea anterior
  ...createFavoriteSlice(...a)
})))
