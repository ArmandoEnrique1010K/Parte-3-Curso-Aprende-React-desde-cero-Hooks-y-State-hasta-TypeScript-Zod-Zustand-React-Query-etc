import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipeSlice, RecipesSliceType } from './recipeSlice';

import { createFavoriteSlice, FavoritesSliceType } from './favoritesSlice';
import { createNotificationSlice, NotificactionSliceType } from './notificationSlice';

// Pasale el type de NotificationSlideType
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificactionSliceType>()(devtools((...a) => ({
  ...createRecipeSlice(...a),
  ...createFavoriteSlice(...a),
  // Duplica la linea anterior para establecer el slice de notification
  ...createNotificationSlice(...a)
})))
