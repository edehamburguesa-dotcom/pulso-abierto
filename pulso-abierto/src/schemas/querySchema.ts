import { z } from "zod";
import type { CryptoId } from "../types";
import { CRYPTO_IDS } from "../types";

const cryptoIds = CRYPTO_IDS as [CryptoId, ...CryptoId[]];

export const querySchema = z.object({
  search: z
    .string()
    .trim()
    .min(2, "Ingresá al menos 2 caracteres para filtrar."),
  crypto: z.enum(cryptoIds, {
    error: () => ({ message: "Seleccioná una criptomoneda válida." }),
  }),
});

export type QueryFormValues = z.infer<typeof querySchema>;