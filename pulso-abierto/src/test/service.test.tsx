import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchCriptoPrices } from '../services/coingecko';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('Servicio CoinGecko', () => {
  it('transforma una respuesta HTTP exitosa en CriptoPrice[]', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          bitcoin: { usd: 60000 },
          ethereum: { usd: 3000 },
          solana: { usd: 150 },
        }),
      })
    );

    const result = await fetchCriptoPrices();

    expect(result).toEqual([
      { id: 'bitcoin', usd: 60000 },
      { id: 'ethereum', usd: 3000 },
      { id: 'solana', usd: 150 },
    ]);
  });

  it('lanza error cuando response.ok es false', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      })
    );

    await expect(fetchCriptoPrices()).rejects.toThrow(/Error HTTP 500/);
  });

  it('omite monedas faltantes en la respuesta sin romper la forma tipada', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ bitcoin: { usd: 60000 } }),
      })
    );

    const result = await fetchCriptoPrices();

    expect(result).toEqual([{ id: 'bitcoin', usd: 60000 }]);
  });
});