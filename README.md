# Pulso Abierto

Aplicación web para consultar cotizaciones de Bitcoin, Ethereum y Solana en
dólares estadounidenses (USD), con favoritos persistentes y navegación entre
listado y detalle.

## URL de la aplicación publicada

https://pulso-abierto.vercel.app

> Reemplazá esta URL por la que te asignó Vercel al desplegar tu proyecto.

## Tecnologías principales

- **React 18** — interfaz declarativa basada en componentes
- **TypeScript 5** — tipado estático
- **Vite 5** — servidor de desarrollo y build productivo
- **React Router 6** — navegación entre listado, detalle y 404
- **Zustand 4** — estado global de favoritos con persistencia en `localStorage`
- **Zod** — validación del formulario de consulta
- **Vitest 2 + Testing Library** — pruebas automatizadas
- **CoinGecko API** — fuente de las cotizaciones

## Requisitos

- Node.js 26.x (o superior)
- npm 10.x (o superior)

## Instalación

```bash
npm install
