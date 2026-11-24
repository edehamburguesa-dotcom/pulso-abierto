import { useMemo } from 'react';
import type { CriptoPrice } from '../types';
import { CoinCard } from './CoinCard';

interface Props {
  coins: CriptoPrice[];
  filter: string;
}

export function CriptoList({ coins, filter }: Props) {
  // Dato derivado: filtrado + cantidad visible. No se almacena como estado.
  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return coins;
    return coins.filter((c) => c.id.toLowerCase().includes(q));
  }, [coins, filter]);

  if (visible.length === 0) {
    return (
      <p className="status-message" data-state="empty" role="status">
        No hay resultados que coincidan con el filtro.
      </p>
    );
  }

  return (
    <section className="result-section" aria-labelledby="resultados-title">
      <div className="section-heading">
        <h2 id="resultados-title">Resultados</h2>
        <span className="currency-label">Moneda: USD</span>
      </div>
      <p aria-live="polite">
        {visible.length}{' '}
        {visible.length === 1 ? 'resultado visible' : 'resultados visibles'}
      </p>
      <ul className="cripto-grid">
        {visible.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </ul>
    </section>
  );
}