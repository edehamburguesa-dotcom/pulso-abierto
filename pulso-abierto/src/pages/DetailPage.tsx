import { Link, useParams } from 'react-router-dom';
import { COIN_IDS, COIN_NAMES, type CoinId } from '../types';
import { FavoriteButton } from '../components/FavoriteButton';
import { useCriptoPrices } from '../hooks/useCriptoPrices';

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const coinId = (COIN_IDS as readonly string[]).includes(id ?? '')
    ? (id as CoinId)
    : null;

  if (!coinId) {
    return (
      <section className="intro">
        <p className="eyebrow">Recurso inexistente</p>
        <h1>Criptomoneda no encontrada</h1>
        <p className="status-message" data-state="error" role="alert">
          La criptomoneda «{id}» no existe en esta aplicación.
        </p>
        <Link to="/" className="card-link">
          ← Volver al listado
        </Link>
      </section>
    );
  }

  // El detalle se reconstruye por URL: los datos provienen del servicio,
  // no del estado de la página anterior.
  const { data, status, error, retry } = useCriptoPrices();
  const coin = data.find((c) => c.id === coinId);

  return (
    <section className="result-section" aria-labelledby="detail-title">
      <Link to="/" className="card-link">
        ← Volver al listado
      </Link>

      <div className="section-heading">
        <h1 id="detail-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
          {COIN_NAMES[coinId]}
          <FavoriteButton id={coinId} />
        </h1>
        <span className="currency-label">Moneda: USD</span>
      </div>

      <dl className="detail-meta">
        <dt>Identificador</dt>
        <dd><code>{coinId}</code></dd>
        <dt>Nombre</dt>
        <dd>{COIN_NAMES[coinId]}</dd>
      </dl>

      {status === 'loading' && (
        <p className="status-message" data-state="loading" role="status">
          Cargando cotización…
        </p>
      )}

      {status === 'error' && (
        <>
          <p className="status-message" data-state="error" role="alert">
            No pudimos cargar la cotización: {error}
          </p>
          <div className="recovery-actions">
            <button type="button" className="secondary-button" onClick={retry}>
              Reintentar
            </button>
          </div>
        </>
      )}

      {status === 'success' && coin && (
        <>
          <span className="cripto-price-label">Precio actual (USD)</span>
          <p className="cripto-price">
            ${coin.usd.toLocaleString('en-US')} USD
          </p>
        </>
      )}

      {status === 'success' && !coin && (
        <p className="status-message" data-state="empty" role="status">
          No hay cotización disponible para esta criptomoneda.
        </p>
      )}
    </section>
  );
}