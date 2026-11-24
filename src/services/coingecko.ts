import type { CoinId, CriptoPrice } from '../types';

const API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

const COIN_IDS: readonly CoinId[] = ['bitcoin', 'ethereum', 'solana'];

type RawResponse = Partial<Record<CoinId, { usd?: number }>>;

/**
 * Acceso a la API pública de CoinGecko.
 * - fetch + response.ok + JSON.
 * - Transformación objeto → CriptoPrice[].
 * - Tipado estricto, sin `any`.
 * - La URL no se expone a la capa de presentación.
 */
export async function fetchCriptoPrices(
  signal?: AbortSignal
): Promise<CriptoPrice[]> {
  const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  const raw = (await response.json()) as RawResponse;

  return COIN_IDS.flatMap<CriptoPrice>((id) => {
    const entry = raw[id];
    return entry && typeof entry.usd === 'number'
      ? [{ id, usd: entry.usd }]
      : [];
  });
}