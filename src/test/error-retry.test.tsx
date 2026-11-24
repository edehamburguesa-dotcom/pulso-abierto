import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, afterEach } from 'vitest';
import * as service from '../services/coingecko';
import { CriptoList } from '../components/CriptoList';

afterEach(() => vi.restoreAllMocks());

describe('Error y reintento', () => {
  it('muestra un mensaje comprensible y permite reintentar con éxito', async () => {
    const spy = vi
      .spyOn(service, 'fetchCriptoPrices')
      .mockRejectedValueOnce(new Error('Error HTTP 500'))
      .mockResolvedValueOnce([{ id: 'bitcoin', usd: 60000 }]);

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CriptoList />
      </MemoryRouter>
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /no pudimos cargar/i
    );
    expect(screen.getByRole('alert')).toHaveTextContent(/error http 500/i);

    await user.click(screen.getByRole('button', { name: /reintentar/i }));

    expect(await screen.findByText(/bitcoin/i)).toBeInTheDocument();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});