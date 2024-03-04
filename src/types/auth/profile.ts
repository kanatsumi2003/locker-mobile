import type {Timestamp} from '..';
import {IStoreItem} from '../store/store';
import {IWallet} from '../wallet/wallet';

export enum ROLE {
  ADMIN = 'Admin',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
  LAUNDRY_ATTENDANT = 'LaundryAttendant',
}

export enum ACCOUNT_STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  VERIFYING = 'Verifying',
}

export interface IProfile extends Timestamp {
  id: number;
  username: string;
  phoneNumber: string;
  role: ROLE;
  status: ACCOUNT_STATUS;
  fullName: string;
  description: string;
  avatar: string;
  store: IStoreItem;
  wallet: IWallet | null;
}
