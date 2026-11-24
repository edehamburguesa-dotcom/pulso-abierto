import { z } from 'zod';
import { COIN_IDS } from './types';

/**
 * Esquema de validación del formulario de consulta.
 * - `query`: texto con al menos 2 caracteres tras recortar espacios.
 * - `coin`: uno de los identificadores admitidos.
 */
export const querySchema = z.object({
  query: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(2, 'Ingresá al menos 2 caracteres para filtrar.')
    ),
  coin: z.enum(COIN_IDS as [string, ...string[]], {
    errorMap: () => ({ message: 'Seleccioná una criptomoneda válida.' }),
  }),
});

export type QueryFormValues = z.infer<typeof querySchema>;