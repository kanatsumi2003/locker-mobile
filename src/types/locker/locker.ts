import type {Paging, PagingParams, Timestamp} from '..';
import type {ILocation, ILocationBody} from '../location/location';
import {ORDER_TYPE} from '../order/order';
import type {IStoreItem} from '../store/store';

export enum LOCKER_STATUS {
  INITIALIZED = 'Initialized',
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  MAINTAINING = 'Maintaining',
  DISCONNECTED = 'Disconnected',
}

export enum LOCKER_EVENT {
  CONNECT = 'Connect',
  UPDATE_STATUS = 'UpdateStatus',
  UPDATE_INFORMATION = 'UpdateInformation',
  OVERLOAD = 'Overload',
  DISCONNECT = 'Disconnect',
}

export interface ILockerItem extends Timestamp {
  id: number;
  name: string;
  code: string;
  image: string;
  status: LOCKER_STATUS;
  description: string;
  location?: ILocation;
  store: IStoreItem;
  macAddress: string;
  ipAddress: string;
  pinCode: string;
  boxCount: number;
  orderTypes: ORDER_TYPE[];
  availableBoxCount: number;
}

export interface ILockerParams extends PagingParams {
  search?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
  status?: LOCKER_STATUS | string;
  storeId?: number;
}

export interface ILockerBody {
  name: string;
  image: string;
  location: ILocationBody;
  description: string;
  storeId: number;
}

export interface ILockerTimelineItem {
  event: LOCKER_EVENT;
  status: LOCKER_STATUS;
  previousStatus: LOCKER_STATUS;
  description: string;
  errorCode: number;
  error: string;
  time: string;
}

export interface ILockerTimelineParams extends Partial<Paging> {
  from?: string;
  to?: string;
  event?: LOCKER_EVENT;
}

export interface ILockerStatisticItem {
  event: LOCKER_EVENT;
  count: number;
}
