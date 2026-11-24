import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../store/favoritesStore';

export function NavBar() {
  const favoritesCount = useFavoritesStore((s) => s.favorites.length);

  return (
    <nav aria-label="Navegación principal">
      <Link to="/">Inicio</Link>
      <span aria-live="polite">
        {favoritesCount} {favoritesCount === 1 ? 'favorito' : 'favoritos'}
      </span>
    </nav>
  );
}