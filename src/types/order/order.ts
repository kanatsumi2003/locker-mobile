import {Dayjs} from 'dayjs';
import type {Paging, PagingParams, Timestamp} from '..';
import type {IProfile} from '../auth/profile';
import type {IBillItem} from '../bill/bill';
import type {IBoxItem} from '../box/box';
import type {IRangePicker} from '../layout/index.interface';
import type {
  ILocation,
  ILocationBody,
  ILocationParams,
} from '../location/location';
import type {ILockerItem, LOCKER_STATUS} from '../locker/locker';
import type {IServiceItem} from '../service/service';
import type {IStaffItem} from '../staff/staff';
import type {IStoreItem} from '../store/store';

export enum ORDER_STATUS {
  INITIALIZED = 'Initialized',
  WAITING = 'Waiting',
  COLLECTED = 'Collected',
  PROCESSING = 'Processing',
  PROCESSED = 'Processed',
  RETURNED = 'Returned',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
  RESERVED = 'Reserved',
  OVERTIME = 'Overtime',
  UPDATING = 'Updating',
  OVERTIME_PROCESSING = 'OvertimeProcessing',
}

export enum ORDER_TYPE {
  LAUNDRY = 'Laundry',
  STORAGE = 'Storage',
}

export enum LAUNDRY_ITEM {
  HAT = 'Hat',
  CAP = 'Cap',
  TIE = 'Tie',
  GLOVES = 'Gloves',
  COAT = 'Coat',
  SHIRT = 'Shirt',
  TSHIRT = 'TShirt',
  SWEATER = 'Sweater',
  JACKET = 'Jacket',
  DRESS = 'Dress',
  SHORTS = 'Shorts',
  JEAN = 'Jeans',
  SHOES = 'Shoes',
  SOCKS = 'Socks',
  TEDDY_BEAR = 'TeddyBear',
  BLANKET = 'Blanket',
  PILLOW = 'Pillow',
  UNDERWARE = 'Underwear',
  BRA = 'Bra',
  SCARF = 'Scarf',
}

export interface ITimeLineItem extends Timestamp {
  id: number;
  status: ORDER_STATUS;
  previousStatus: ORDER_STATUS;
  description: string;
  staff?: IStaffItem;
}

export interface IDetailItem extends Timestamp {
  id: number;
  service: IServiceItem;
  quantity: number;
  price: number;
  items: IDetailItemServiceItem[];
}

export interface IDetailItemServiceItem extends Timestamp {
  id: number;
  type: LAUNDRY_ITEM;
  image: string;
  description: string;
}

export interface IOrderItem extends Timestamp {
  id: number;
  type: ORDER_TYPE;
  pinCode?: number;
  pinCodeIssuedAt?: string;
  sendBox: IBoxItem;
  receiveBox: IBoxItem;
  sender: IProfile;
  receiver: IProfile;
  receiveAt: string;
  staff: IStaffItem;
  status: ORDER_STATUS;
  price: number;
  extraCount: number;
  extraFee: number;
  discount: number;
  totalPrice: number;
  description?: string;
  staffNote?: string;
  customerNote?: string;
  locker: ILockerItem;
  store: IStoreItem;
  deliverySupported: boolean;
  deliveryAddress: ILocation;
  updatedInfo: boolean;
  shippingFee: number;
  reservationFee: number;
}

export interface IOrderDetailItem extends IOrderItem {
  timelines: ITimeLineItem[];
  details: IDetailItem[];
  bill?: IBillItem;
}

export interface IOrderParams extends PagingParams {
  search?: string;
  lockerId?: number;
  type?: ORDER_TYPE | string;
  status?: ORDER_STATUS | string;
  from?: string;
  to?: string;
  staffId?: number;
  customerId?: number;
  storeId?: number;
  serviceId?: number;
}

export interface ICreateOrderRequest {
  lockerId: number;
  type: ORDER_TYPE;
  senderPhone: string;
  receiverPhone: string;
  details: IAddOrderDetailItem[];
  deliveryAddress?: ILocationBody;
  intendedReceiveAt?: string | Dayjs;
  isReserving: boolean;
  customerNote?: string;
  totalPrice?: number | string;
  reservationFee?: number | string;
  deliveryJoinedAddress?: string;
  locker?: Partial<ILockerItem>;
}

export interface IUpdateOrderParams {
  amount: number;
  fee: number;
  description: string;
}

export interface IServiceStatisticItem {
  service: string;
  totalOrders: number;
  totalRevenue: number;
}

export interface IDashboard {
  totalOrders: number;
  totalRevenue: number;
  serviceStatistic: IServiceStatisticItem[];
}

export interface IDashboardParams
  extends Partial<Paging>,
    ILocationParams,
    IRangePicker {
  year?: number;
  lockerId?: number;
  storeId?: number;
  search?: string;
  status?: LOCKER_STATUS;
}

export interface IDashboardStoreParams extends Partial<Paging> {
  search?: string;
  from?: string;
  to?: string;
}

export interface IEditOrderDetailBody {
  quantity: string;
}

export interface IAddOrderDetailItem {
  serviceId: number;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
  unit?: string;
}

export declare type OrderType =
  | ORDER_STATUS.PROCESSING
  | ORDER_STATUS.PROCESSED
  | ORDER_STATUS.RETURNED
  | ORDER_STATUS.RESERVED
  | ORDER_STATUS.OVERTIME_PROCESSING
  | undefined;

export declare type OrderTypeOptions = `${ORDER_TYPE}`;

export interface IOrderNote {
  staffNote?: string;
  description?: string;
}
