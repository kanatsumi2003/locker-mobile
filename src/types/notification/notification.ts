import type {Paging} from '..';

export enum NOTIFICATION_TYPE {
  SYSTEM_ORDER_CREATED = 'SystemOrderCreated',
  SYSTEM_ORDER_COLLECTED = 'SystemOrderCollected',
  SYSTEM_ORDER_PROCESSED = 'SystemOrderProcessed',
  SYSTEM_ORDER_RETURNED = 'SystemOrderReturned',
  SYSTEM_ORDER_CANCELED = 'SystemOrderCanceled',
  SYSTEM_ORDER_COMPLETED = 'SystemOrderCompleted',
  SYSTEM_ORDER_OVERTIME = 'SystemOrderOverTime',
  SYSTEM_LOCKER_CONNECTED = 'SystemLockerConnected',
  SYSTEM_LOCKER_DISCONNECTED = 'SystemLockerDisconnected',
  SYSTEM_LOCKER_BOX_WARNING = 'SystemLockerBoxWarning',
  SYSTEM_LOCKER_BOX_OVERLOADED = 'SystemLockerBoxOverloaded',
  ACCOUNT_OTP_CREATED = 'AccountOtpCreated',
  SYSTEM_STAFF_CREATED = 'SystemStaffCreated',
}

export enum ENTITY_TYPE {
  ORDER = 'Order',
  ACCOUNT = 'Account',
  LOCKER = 'Locker',
  SERVICE = 'Service',
  PAYMENT = 'Payment',
}

export enum NOTIFICATION_LEVEL {
  CRITICAL = 'Critical',
  WARNING = 'Warning',
  INFORMATION = 'Information',
}

export interface INotificationItem {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  deleted: boolean;
  id: number;
  accountId: number;
  type: NOTIFICATION_TYPE;
  entityType: ENTITY_TYPE;
  referenceId: string;
  content: string;
  data: string;
  readAt: string;
  isRead: true;
  level: NOTIFICATION_LEVEL;
  title: string;
}

export interface IUnreadCountItem {
  count: number;
}

export interface INotificationParams extends Partial<Paging> {
  isRead?: boolean;
  level?: boolean;
}

export interface INavigationInfo {
  screen: string;
  id: number | string;
}
