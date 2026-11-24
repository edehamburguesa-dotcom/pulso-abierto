markdown
# Pulso Abierto

Aplicación web para consultar cotizaciones de Bitcoin, Ethereum y Solana en
dólares estadounidenses (USD), con favoritos persistentes y navegación entre
listado y detalle.

## URL de la aplicación publicada

https://pulso-abierto-nu.vercel.app/


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
Desarrollo
bash
npm run dev
La aplicación estará disponible en http://localhost:5173.

Pruebas
bash
npm test
Ejecuta los 6 casos de prueba organizados en 4 archivos:

src/test/favorites.test.tsx — marcar/desmarcar favoritos y sincronización entre vistas

src/test/list.test.tsx — carga seguida de resultado exitoso y estado vacío

src/test/error-retry.test.tsx — error y recuperación mediante reintento

src/test/service.test.ts — capa de servicios (respuesta exitosa, ok: false, datos faltantes)

Build productivo
bash
npm run build
Genera la carpeta dist/ con los archivos optimizados para producción.

Preview del build
bash
npm run preview
Sirve la versión productiva en http://localhost:4173 para comprobarla antes
de publicar.

Variables de entorno
El proyecto no requiere variables de entorno. La URL de la API de CoinGecko
está definida en src/services/coingecko.ts:

text
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd
Si en el futuro se incorporan variables de entorno, deberán declararse en
Vercel → Settings → Environment Variables, y exponerse en el cliente con el
prefijo VITE_ (por ejemplo VITE_API_URL).

Estructura del proyecto
text
pulso-abierto/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types.ts
    ├── validation.ts
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── QueryForm.tsx
    │   ├── StatusMessage.tsx
    │   ├── CriptoList.tsx
    │   ├── CoinCard.tsx
    │   └── FavoriteButton.tsx
    ├── pages/
    │   ├── ListPage.tsx
    │   ├── DetailPage.tsx
    │   └── NotFoundPage.tsx
    ├── hooks/
    │   └── useCriptoPrices.ts
    ├── services/
    │   └── coingecko.ts
    ├── store/
    │   └── favoritesStore.ts
    └── test/
        ├── setup.ts
        ├── favorites.test.tsx
        ├── list.test.tsx
        ├── error-retry.test.tsx
        └── service.test.ts
API utilizada
GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd

ids: identificadores de criptomonedas (bitcoin, ethereum, solana).

vs_currencies: moneda de referencia del precio (usd).

Propiedad del precio en USD: usd dentro de cada objeto de la moneda.

Ejemplo de respuesta:

json
{
  "bitcoin":  { "usd": 60000 },
  "ethereum": { "usd": 3000 },
  "solana":   { "usd": 150 }
}
Funcionalidades
Consulta manual de cotizaciones mediante formulario controlado.

Validación del formulario con Zod (safeParse): texto mínimo y moneda válida.

Estados diferenciados de la interfaz: inicial, carga, resultado, vacío y error.

Acción de reintento en caso de error de consulta.

Navegación entre listado y detalle de cada criptomoneda (/criptomonedas/:id).

Página 404 para rutas inexistentes.

Favoritos globales gestionados con Zustand y persistidos en localStorage.

Interfaz accesible (roles, aria-*, foco visible, estados sin depender solo del color).

Diseño responsivo (móvil y escritorio).

Persistencia de favoritos
Los favoritos se guardan en localStorage bajo la clave
pulso-abierto:favorites. Solo se persiste la colección favorites; los
estados de carga y error no forman parte del store, por lo que no se
serializan.

Mejora de mantenibilidad aplicada
Problema identificado: los componentes Header y FavoriteButton
repetían el tipado de los selectores de Zustand (s: FavoritesState) y
accedían directamente a la estructura interna del store
(s.favorites.length, s.favorites.includes(id), s.toggleFavorite),
generando acoplamiento y duplicación.

Cambio realizado: se extrajeron hooks derivados en
src/store/favoritesStore.ts (useIsFavorite, useToggleFavorite,
useFavoritesCount) que encapsulan los selectores y su tipado. Los
componentes consumidores ahora importan esos hooks en lugar de escribir
selectores inline.

Comprobación de no regresión:

npm test — 6 pruebas en verde, incluyendo el test de favoritos que
verifica el cambio de estado visible y la sincronización entre tarjeta
y detalle.

npm run build — compilación sin errores de TypeScript.

Verificación manual de los recorridos: marcar favorito en listado,
navegar al detalle, desmarcar, recargar y comprobar persistencia.

Notas de despliegue
El archivo vercel.json incluye una regla de rewrite para SPA que redirige
todas las rutas a index.html, permitiendo recargar directamente rutas de
detalle como /criptomonedas/bitcoin sin obtener un 404:

json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
Configuración en Vercel
Parámetro	Valor
Framework Preset	Vite (autodetectado)
Build Command	npm run build
Output Directory	dist
Install Command	npm install --no-bin-links
Node.js Version	26.x
Nota sobre el Install Command: se usa npm install --no-bin-links
para evitar que Vercel intente ejecutar los enlaces simbólicos de
node_modules/.bin/, que provocaban el error Permission denied
(código 126) durante el build.

Licencia
Proyecto educativo desarrollado en el marco del curso de Desarrollo Frontend
con React y TypeScript. Datos proporcionados por
CoinGecko.
markdown
## Verificación final

- **Pruebas ejecutadas:** `npm test` — 6 pruebas en 4 archivos, todas en verde
  (favoritos, listado, error/reintento, servicio).
- **Build generado correctamente:** `npm run build` — `tsc` sin errores y
  Vite generó `dist/` con los archivos optimizados.
- **Preview comprobado:** `npm run preview` — la aplicación sirvió desde
  `dist/` en `http://localhost:4173`; se verificaron consulta a la API,
  navegación listado ↔ detalle, favoritos, formulario y persistencia tras
  recarga.
- **Despliegue realizado:** aplicación publicada en Vercel y accesible en la
  URL indicada al inicio de este README; se comprobaron carga, consulta,
  navegación, recarga directa de rutas de detalle, favoritos, formulario y
  comportamiento responsivo.
- **Fecha de verificación:** 24 de noviembre de 2026.
