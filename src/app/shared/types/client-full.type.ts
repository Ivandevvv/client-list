import { ClientList } from './client-list.type';
import { PaymentListType } from './payment-list.type';

export interface ClientFull extends ClientList {
  phoneNumber: string;
  transaction: PaymentListType[];
}
