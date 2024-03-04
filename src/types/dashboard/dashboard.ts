import type { ILocation } from '../location/location';
import type { LOCKER_STATUS } from '../locker/locker';
import type { ORDER_STATUS, ORDER_TYPE } from '../order/order';
import type { STORE_STATUS } from '../store/store';

export interface IDashboardParams {
  lockerId: number;
  from?: string;
  to?: string;
}

export interface IDashboardOverviewItem {
  storeCount: number;
  lockerCount: number;
  staffCount: number;
  customerCount: number;
  serviceCount: number;
}

export interface IDashboardStoreItem {
  id: number;
  name: string;
  status: STORE_STATUS;
  image: string;
  createdAt: string;
  staffCount: number;
  lockerCount: number;
  orderCount: number;
  revenue: number;
}

export interface IDashboardRevenueItem {
  month: number;
  orderCount: number;
  revenue: number;
}
export interface IDashboardLockerItem {
  status: LOCKER_STATUS;
  count: number;
}

export interface IDashboardLockerLocationItem {
  id: number;
  name: string;
  code: string;
  image: string;
  status: LOCKER_STATUS;
  location: ILocation;
  createdAt: string;
}

export interface IDashboardLockerLocationItem {
  id: number;
  name: string;
  code: string;
  image: string;
  status: LOCKER_STATUS;
  location: ILocation;
  createdAt: string;
}

export interface IDashboardOrderType {
  type: ORDER_TYPE;
  count: number;
  revenue: number;
}
export interface IDashboardOrderStatus {
  status: ORDER_STATUS;
  count: number;
}

export interface IDashboardOrderItem {
  overview: {
    completed: number;
    revenue: number;
    orderTypes: IDashboardOrderType[];
  };
  orderStatuses: IDashboardOrderStatus[];
  orderTypes: IDashboardOrderType[];
}
