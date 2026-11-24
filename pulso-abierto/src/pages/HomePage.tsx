import { useMemo, useState } from "react";
import { QueryForm } from "../components/QueryForm";
import { StatusMessage } from "../components/StatusMessage";
import { CryptoList } from "../components/CriptoList";
import { useCryptoPrices } from "../hooks/useCriptoPrices";
import type { CryptoId, QueryOrder } from "../types";
import { CRYPTO_META } from "../types";

export function HomePage() {
  const { items, state, errorMessage, runQuery, retry } = useCryptoPrices();

  const [search, setSearch] = useState("");
  const [onlyId, setOnlyId] = useState<CryptoId | null>(null);
  const [order, setOrder] = useState<QueryOrder>("desc");

  const visibleItems = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    const filtered = items.filter((item) => {
      if (onlyId && item.id !== onlyId) return false;
      if (!normalized) return true;
      const meta = CRYPTO_META[item.id];
      return (
        meta.name.toLowerCase().includes(normalized) ||
        meta.symbol.toLowerCase().includes(normalized) ||
        item.id.includes(normalized)
      );
    });

    return [...filtered].sort((a, b) =>
      order === "asc" ? a.usd - b.usd : b.usd - a.usd
    );
  }, [items, search, onlyId, order]);

  const handleSearch = (criteria: {
    search: string;
    crypto: CryptoId;
    order: QueryOrder;
  }) => {
    setSearch(criteria.search);
    setOnlyId(criteria.crypto);
    setOrder(criteria.order);
    runQuery();
  };

  const isLoading = state === "loading";

  const statusMessage = (() => {
    switch (state) {
      case "idle":
        return "Todavía no realizaste una consulta. Presioná el botón para comenzar.";
      case "loading":
        return "Consultando cotizaciones...";
      case "result":
        return `Cotizaciones actualizadas correctamente. ${visibleItems.length} resultado(s) visibles.`;
      case "empty":
        return "La consulta fue exitosa, pero no se recibieron datos para mostrar.";
      case "error":
        return `No se pudieron obtener las cotizaciones. ${errorMessage ?? ""} Podés intentarlo nuevamente.`;
    }
  })();

  return (
    <>
      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">MERCADOS DIGITALES</p>
        <h1 id="page-title">Cotizaciones de criptomonedas</h1>
        <p className="intro-text">
          Consulta el valor actual de bitcoin, ethereum y solana expresado en
          dólares estadounidenses.
        </p>
      </section>

      <section className="query-panel" aria-labelledby="query-title">
        <div>
          <h2 id="query-title">Consultar precios</h2>
          <p>Los precios se obtienen directamente de coingecko.</p>
        </div>
        <QueryForm onSearch={handleSearch} isLoading={isLoading} />
        <StatusMessage state={state} message={statusMessage} onRetry={retry} />
      </section>

      <section className="result-section" aria-labelledby="results-title">
        <div className="section-heading">
          <p className="eyebrow">TUS RESULTADOS</p>
          <h2 id="results-title">Precios actuales</h2>
          <span className="currency-label">Moneda USD</span>
        </div>

        {state === "result" && visibleItems.length > 0 && (
          <CryptoList items={visibleItems} />
        )}
      </section>
    </>
  );
}