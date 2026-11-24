import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CoinId } from '../types';

export interface FavoritesState {
  favorites: CoinId[];
  toggleFavorite: (id: CoinId) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => {
          const exists = state.favorites.includes(id);
          return {
            favorites: exists
              ? state.favorites.filter((f) => f !== id)
              : [...state.favorites, id],
          };
        }),
    }),
    {
      name: 'pulso-abierto:favorites',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);

// ---- Selectores encapsulados ----
// Centralizan el acceso al store y el tipado, evitando duplicación
// en los componentes consumidores.

export const useIsFavorite = (id: CoinId) =>
  useFavoritesStore((s: FavoritesState) => s.favorites.includes(id));

export const useToggleFavorite = () =>
  useFavoritesStore((s: FavoritesState) => s.toggleFavorite);

export const useFavoritesCount = () =>
  useFavoritesStore((s: FavoritesState) => s.favorites.length);