import type {Timestamp} from '..';
import type {IProfile} from '../auth/profile';
import type {ORDER_STATUS, ORDER_TYPE} from '../order/order';

export enum BOX_STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  WAITING = 'Waiting',
}

export interface IBoxItem {
  id: number;
  number: number;
  pinNo?: number;
  isActive: boolean;
  lockerId: number;
  lastOrder: IBoxOrder;
  isAvailable: boolean;
  description?: string;
}

export interface IBoxOrder extends Timestamp {
  id: number;
  pinCode?: number;
  type: ORDER_TYPE;
  pinCodeIssuedAt?: string;
  sender: IProfile;
  receiver: IProfile;
  receiveAt: string;
  status: ORDER_STATUS;
  price: number;
  extraCount?: number;
  extraFee?: number;
  discount?: number;
  description?: string;
}

export declare type BoxType = 'available' | 'unavailable' | 'locked';

export interface IEmergencyOpenBoxBody {
  boxNumber: number;
  token: string;
}
