import { Link } from 'react-router-dom';
import {
  useFavoritesStore,
  type FavoritesState,
} from '../store/favoritesStore';

export function Header() {
  const favoritesCount = useFavoritesStore(
    (s: FavoritesState) => s.favorites.length
  );

  return (
    <header className="site-header">
      <div className="container header-content">
        <Link to="/" className="brand" aria-label="Pulso Abierto — Inicio">
          <span className="brand-icon" aria-hidden="true">PA</span>
          <span>Pulso Abierto</span>
        </Link>
        <p className="header-label">
          Cotizaciones en USD · Bitcoin · Ethereum · Solana
        </p>
        <p className="header-label" aria-live="polite">
          {favoritesCount}{' '}
          {favoritesCount === 1 ? 'favorito guardado' : 'favoritos guardados'}
        </p>
      </div>
    </header>
  );
}