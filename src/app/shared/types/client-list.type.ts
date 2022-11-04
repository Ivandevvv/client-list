import { Balance } from './balance.type';

export interface ClientList {
  id: number;
  name: string;
  inn: string;
  openingDate: string;
  balance: Balance;
}
