import { useState } from 'react';
import { useCriptoPrices } from '../hooks/useCriptoPrices';
import { QueryForm, type QueryFormSubmit } from '../components/QueryForm';
import { StatusMessage } from '../components/StatusMessage';
import { CriptoList } from '../components/CriptoList';
import { COIN_NAMES, type CoinId } from '../types';

export function ListPage() {
  const { data, status, error, retry } = useCriptoPrices();

  const [filter, setFilter] = useState('');
  const [highlighted, setHighlighted] = useState<CoinId | null>(null);

  function handleQuery(values: QueryFormSubmit) {
    setFilter(values.query);
    setHighlighted(values.coin as CoinId);
  }

  return (
    <>
      <section className="intro">
        <p className="eyebrow">Panel de cotizaciones</p>
        <h1>Pulso del mercado cripto</h1>
        <p className="intro-text">
          Consultá el precio en dólares estadounidenses de Bitcoin, Ethereum y
          Solana. Los favoritos se guardan y se conservan al recargar.
        </p>
      </section>

      <QueryForm disabled={status === 'loading'} onSubmit={handleQuery} />

      {highlighted && status === 'success' && (
        <p aria-live="polite" className="intro-text">
          Moneda destacada: <strong>{COIN_NAMES[highlighted]}</strong>
        </p>
      )}

      <StatusMessage status={status} error={error} onRetry={retry} />

      {status === 'success' && <CriptoList coins={data} filter={filter} />}
    </>
  );
}