import type {Paging, Timestamp} from '..';

export enum PAYMENT_METHOD {
  MOMO = 'Momo',
  VNPAY = 'VnPay',
  CASH = 'Cash',
  WALLET = 'Wallet',
}

export enum PAYMENT_STATUS {
  CREATED = 'Created',
  PROCESSING = 'Processing',
  FAILED = 'Failed',
  COMPLETED = 'Completed',
}

export interface IBillItem extends Timestamp {
  id: number;
  referenceOrderId: number;
  amount: number;
  method: PAYMENT_METHOD;
  content: string;
  referenceTransactionId: string;
}

export interface IPaymentItem extends Partial<Timestamp> {
  id: number;
  amount: number;
  method: PAYMENT_METHOD;
  content: string;
  referenceTransactionId: string;
  referenceId: string;
  qr: string;
  url: string;
  orderId: number;
  customerId: number;
  status: PAYMENT_STATUS;
  type: PAYMENT_TYPE;
}

export interface IPaymentParams extends Partial<Paging> {
  search?: string;
  from?: string;
  to?: string;
  status?: PAYMENT_STATUS;
  orderId?: number;
  customerId?: number;
  method?: PAYMENT_METHOD;
}

export interface IPaymentRequest {
  method: PAYMENT_METHOD;
}

export declare type PaymentMethodType = `${PAYMENT_METHOD}`;

export enum PAYMENT_TYPE {
  CHECKOUT = 'Checkout',
  RESERVE = 'Reserve',
  DEPOSIT = 'Deposit',
  REFUND = 'Refund',
}
