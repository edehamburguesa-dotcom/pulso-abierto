import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import * as service from '../services/coingecko';
import { CriptoList } from '../components/CriptoList';

afterEach(() => vi.restoreAllMocks());

describe('Listado', () => {
  it('muestra carga y luego resultados exitosos', async () => {
    vi.spyOn(service, 'fetchCriptoPrices').mockResolvedValue([
      { id: 'bitcoin', usd: 60000 },
      { id: 'ethereum', usd: 3000 },
      { id: 'solana', usd: 150 },
    ]);

    render(
      <MemoryRouter>
        <CriptoList />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toHaveTextContent(/cargando/i);

    expect(await screen.findByText(/bitcoin/i)).toBeInTheDocument();
    expect(screen.getByText(/ethereum/i)).toBeInTheDocument();
    expect(screen.getByText(/solana/i)).toBeInTheDocument();
  });

  it('muestra el mensaje cuando no hay datos', async () => {
    vi.spyOn(service, 'fetchCriptoPrices').mockResolvedValue([]);

    render(
      <MemoryRouter>
        <CriptoList />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/no hay resultados disponibles/i)
    ).toBeInTheDocument();
  });
});