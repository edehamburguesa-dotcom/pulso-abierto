import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchCriptoPrices } from '../services/coingecko';
import type { CriptoPrice } from '../types';

export type QueryStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export interface CriptoPricesState {
  data: CriptoPrice[];
  status: QueryStatus;
  error: string | null;
  retry: () => void;
  /** Dispara manualmente una nueva consulta (botón "Consultar"). */
  run: () => void;
}

/**
 * Hook de consulta:
 * - estados diferenciados: idle / loading / success / empty / error,
 * - bloqueo de solicitudes repetidas durante carga,
 * - comprobación de consulta vigente para evitar respuestas obsoletas,
 * - acción de reintento.
 */
export function useCriptoPrices(): CriptoPricesState {
  const [data, setData] = useState<CriptoPrice[]>([]);
  const [status, setStatus] = useState<QueryStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const load = useCallback(async () => {
    if (status === 'loading') return; // evita envío repetido
    const current = ++requestId.current;
    setStatus('loading');
    setError(null);

    try {
      const result = await fetchCriptoPrices();
      if (current !== requestId.current) return; // respuesta obsoleta
      setData(result);
      setStatus(result.length === 0 ? 'empty' : 'success');
    } catch (e) {
      if (current !== requestId.current) return;
      setError(e instanceof Error ? e.message : 'Error desconocido');
      setStatus('error');
    }
  }, [status]);

  useEffect(() => {
    void load();
    // Solo en montaje inicial. La recarga manual usa `retry`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, status, error, retry: load, run: load };
}