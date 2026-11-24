import { useState, type FormEvent } from 'react';
import { COIN_IDS, COIN_NAMES } from '../types';
import { querySchema } from '../validation';

export interface QueryFormSubmit {
  query: string;
  coin: string;
}

interface Props {
  disabled?: boolean;
  onSubmit: (values: QueryFormSubmit) => void;
}

export function QueryForm({ disabled, onSubmit }: Props) {
  const [query, setQuery] = useState('');
  const [coin, setCoin] = useState<string>(COIN_IDS[0]);
  const [errors, setErrors] = useState<{ query?: string; coin?: string }>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = querySchema.safeParse({ query, coin });
    if (!parsed.success) {
      const fieldErrors: { query?: string; coin?: string } = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === 'query' || key === 'coin') fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  }

  return (
    <section className="query-panel" aria-labelledby="query-title">
      <div>
        <h2 id="query-title">Consultar cotizaciones</h2>
        <p>Ingresá un filtro y elegí la criptomoneda a destacar.</p>
      </div>

      <form
        className="query-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formulario de consulta"
      >
        <div className="form-field">
          <label htmlFor="query-input">Buscar criptomoneda</label>
          <input
            id="query-input"
            name="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej.: bitcoin"
            aria-invalid={Boolean(errors.query)}
            aria-describedby={errors.query ? 'query-error' : undefined}
            required
          />
          {errors.query && (
            <p id="query-error" className="field-error" role="alert">
              {errors.query}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="coin-select">Criptomoneda a destacar</label>
          <select
            id="coin-select"
            name="coin"
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            aria-invalid={Boolean(errors.coin)}
            aria-describedby={errors.coin ? 'coin-error' : undefined}
          >
            {COIN_IDS.map((id) => (
              <option key={id} value={id}>
                {COIN_NAMES[id]}
              </option>
            ))}
          </select>
          {errors.coin && (
            <p id="coin-error" className="field-error" role="alert">
              {errors.coin}
            </p>
          )}
        </div>

        <button id="consult-button" type="submit" disabled={disabled}>
          {disabled ? 'Consultando…' : 'Consultar'}
        </button>
      </form>
    </section>
  );
}