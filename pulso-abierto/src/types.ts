export type CoinId = 'bitcoin' | 'ethereum' | 'solana';

export interface CriptoPrice {
  id: CoinId;
  usd: number;
}

export const COIN_NAMES: Record<CoinId, string> = {
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum',
  solana: 'Solana',
};

export const COIN_IDS: readonly CoinId[] = ['bitcoin', 'ethereum', 'solana'];