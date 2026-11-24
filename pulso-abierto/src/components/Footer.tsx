export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>
          Datos proporcionados por{' '}
          <a
            href="https://www.coingecko.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            CoinGecko
          </a>
          .
        </p>
        <p>Precios expresados en dólares estadounidenses (USD).</p>
      </div>
    </footer>
  );
}