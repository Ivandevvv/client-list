import { Balance } from './balance.type';
import { PaymentType } from './payment-type.enum';

export interface PaymentListType {
  paymentDate: number;
  agent: string;
  balance: Balance;
  type: PaymentType;
}
