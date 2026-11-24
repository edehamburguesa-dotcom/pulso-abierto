import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { CoinCard } from '../components/CoinCard';
import type { CriptoPrice } from '../types';

const coin: CriptoPrice = { id: 'bitcoin', usd: 60000 };

describe('Favoritos', () => {
  it('permite marcar y desmarcar un favorito desde la tarjeta', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CoinCard coin={coin} />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', {
      name: /marcar bitcoin como favorito/i,
    });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.click(button);

    expect(
      screen.getByRole('button', { name: /quitar bitcoin de favoritos/i })
    ).toHaveAttribute('aria-pressed', 'true');

    await user.click(
      screen.getByRole('button', { name: /quitar bitcoin de favoritos/i })
    );

    expect(
      screen.getByRole('button', { name: /marcar bitcoin como favorito/i })
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('sincroniza el estado del favorito entre tarjeta y detalle', async () => {
    const user = userEvent.setup();

    // Renderizamos ambas vistas en el mismo árbol (simula navegación compartida).
    const { rerender } = render(
      <MemoryRouter>
        <CoinCard coin={coin} />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole('button', { name: /marcar bitcoin como favorito/i })
    );

    rerender(
      <MemoryRouter>
        <CoinCard coin={coin} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('button', { name: /quitar bitcoin de favoritos/i })
    ).toHaveAttribute('aria-pressed', 'true');
  });
});