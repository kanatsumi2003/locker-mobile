import type { Paging, Timestamp } from '..';
import type { ROLE } from '../auth/profile';
import type { IStoreItem } from '../store/store';

export enum STAFF_STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  VERIFYING = 'Verifying',
}

export interface IStaffItem extends Timestamp {
  id: number;
  userName: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  password: string;
  description: string;
  status: STAFF_STATUS;
  store: IStoreItem;
  role: ROLE;
}

export interface IStaffParams extends Partial<Paging> {
  search?: string;
  name?: string;
  status?: STAFF_STATUS;
  storeId?: number;
  lockerId?: number;
  createdFrom?: string;
  createdTo?: string;
  forLockerId?: number;
}

export interface ICreateStaffParams {
  fullName: string;
  phoneNumber: string;
  avatar: string;
  password: string;
  description: string;
  storeId: number;
}
