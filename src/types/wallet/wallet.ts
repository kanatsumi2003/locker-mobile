import {IProfile} from '../auth/profile';
import {IPaymentItem, PAYMENT_METHOD} from '../bill/bill';

export interface IWallet {
  id: number;
  balance: number;
  lastDepositAt: string;
}

export interface IWalletDeposit {
  phoneNumber: string;
  amount: number;
  method: PAYMENT_METHOD;
}

export interface IWalleDepositResponse extends IPaymentItem {
  customer: IProfile;
}
