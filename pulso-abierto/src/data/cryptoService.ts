import type { CryptoApiResponse, CryptoId } from "../types";
import { CRYPTO_IDS } from "../types";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd";

export async function fetchCryptoPrices(): Promise<CryptoApiResponse> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
  }

  const data: unknown = await response.json();

  if (typeof data !== "object" || data === null) {
    throw new Error("La API devolvió un formato inesperado.");
  }

  const result: CryptoApiResponse = {};
  const record = data as Record<string, unknown>;

  for (const id of CRYPTO_IDS as CryptoId[]) {
    const entry = record[id];
    if (
      entry &&
      typeof entry === "object" &&
      "usd" in entry &&
      typeof (entry as { usd: unknown }).usd === "number"
    ) {
      result[id] = { usd: (entry as { usd: number }).usd };
    }
  }

  return result;
}