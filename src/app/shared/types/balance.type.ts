
export interface Balance {
  sum: number;
  currency: BalanceCurrency;
}

export enum BalanceCurrency {
  USD = 'USD',
  RUB = 'RUB'
}
