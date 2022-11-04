import { PaymentType } from './payment-type.enum';

export interface PaymentListType {
  paymentDate: number;
  agent: string;
  sum: number;
  type: PaymentType;
}
