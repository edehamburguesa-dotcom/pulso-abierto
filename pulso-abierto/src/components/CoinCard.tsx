import { Link } from 'react-router-dom';
import { COIN_NAMES, type CriptoPrice } from '../types';
import { FavoriteButton } from './FavoriteButton';

interface Props {
  coin: CriptoPrice;
}

export function CoinCard({ coin }: Props) {
  const name = COIN_NAMES[coin.id];

  return (
    <li className="cripto-card">
      <h3>
        <Link to={`/criptomonedas/${coin.id}`} className="card-link">
          {name}
        </Link>
      </h3>
      <span className="cripto-price-label">Precio (USD)</span>
      <p className="cripto-price">
        ${coin.usd.toLocaleString('en-US')} USD
      </p>
      <div className="card-actions">
        <Link to={`/criptomonedas/${coin.id}`} className="card-link">
          Ver detalle
        </Link>
        <FavoriteButton id={coin.id} />
      </div>
    </li>
  );
}