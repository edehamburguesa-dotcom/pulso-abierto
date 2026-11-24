import type { QueryStatus } from '../hooks/useCriptoPrices';

interface Props {
  status: QueryStatus;
  error: string | null;
  onRetry: () => void;
}

export function StatusMessage({ status, error, onRetry }: Props) {
  if (status === 'idle') {
    return (
      <div className="status-block">
        <p className="status-message" data-state="idle" role="status">
          Presioná «Consultar» para obtener las cotizaciones.
        </p>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="status-block">
        <p
          className="status-message"
          data-state="loading"
          role="status"
          aria-live="polite"
        >
          Cargando cotizaciones…
        </p>
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="status-block">
        <p className="status-message" data-state="empty" role="status">
          La consulta se completó sin resultados.
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="status-block">
        <p className="status-message" data-state="error" role="alert">
          No pudimos cargar las cotizaciones: {error}
        </p>
        <div className="recovery-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onRetry}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return null; // success → la lista se encarga de representar los datos
}