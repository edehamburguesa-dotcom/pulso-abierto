import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="intro">
      <p className="eyebrow">Error 404</p>
      <h1>Página no encontrada</h1>
      <p className="intro-text">
        La dirección a la que intentaste acceder no existe en Pulso Abierto.
      </p>
      <Link to="/" className="card-link">
        ← Volver al inicio
      </Link>
    </section>
  );
}