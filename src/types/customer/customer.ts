import type { Paging, Timestamp } from '..';
import type { ROLE } from '../auth/profile';

export enum CUSTOMER_STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  VERIFYING = 'Verifying',
}

export interface ICustomerItem extends Timestamp {
  id: number;
  userName: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  description: string;
  status: CUSTOMER_STATUS;
  role: ROLE;
}

export interface ICustomerParams extends Partial<Paging> {
  search?: string;
  name?: string;
  status?: CUSTOMER_STATUS;
  storeId?: number;
  lockerId?: number;
  createdFrom?: string;
  createdTo?: string;
}

export interface ICreateCustomerParams {
  fullName: string;
  phoneNumber: string;
  avatar: string;
  description: string;
}
