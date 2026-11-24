import { useFavoritesStore, type FavoritesState } from '../store/favoritesStore';
import { COIN_NAMES, type CoinId } from '../types';

interface Props {
  id: CoinId;
}

export function FavoriteButton({ id }: Props) {
  const isFavorite = useFavoritesStore(
    (s: FavoritesState) => s.favorites.includes(id)
  );
  const toggleFavorite = useFavoritesStore(
    (s: FavoritesState) => s.toggleFavorite
  );
  const name = COIN_NAMES[id];

  const label = isFavorite
    ? `Quitar ${name} de favoritos`
    : `Marcar ${name} como favorito`;

  return (
    <button
      type="button"
      className="favorite-button"
      aria-pressed={isFavorite}
      aria-label={label}
      title={label}
      onClick={() => toggleFavorite(id)}
    >
      <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
    </button>
  );
}