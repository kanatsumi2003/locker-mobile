import {STORE_STATUS} from '../types/store/store';
import {LOCKER_STATUS} from '../types/locker/locker';
import {ORDER_STATUS} from '../types/order/order';
import {PAYMENT_STATUS} from '../types/bill/bill';
import {
  mapBoxStatus,
  mapLockerStatus,
  mapNotificationLevel,
  mapOrderStatus,
  mapPaymentStatus,
  mapStoreStatus,
} from './textMapper';
import CustomBadge from '../components/CustomBadge';
import {NOTIFICATION_LEVEL} from '../types/notification/notification';
import {BOX_STATUS} from '../types/box/box';

export const badgeRenderStoreStatus = (value: STORE_STATUS | undefined) => {
  const status = () => {
    switch (value) {
      case STORE_STATUS.ACTIVE:
        return 'success';
      default:
        return 'error';
    }
  };

  return <CustomBadge text={mapStoreStatus(value)} colorScheme={status()} />;
};

export const badgeRenderLockerStatus = (value: LOCKER_STATUS | undefined) => {
  const status = () => {
    switch (value) {
      case LOCKER_STATUS.ACTIVE:
        return 'success';
      case LOCKER_STATUS.INACTIVE:
      case LOCKER_STATUS.DISCONNECTED:
        return 'error';
      case LOCKER_STATUS.MAINTAINING:
        return 'warning';
      default:
        return 'info';
    }
  };

  return <CustomBadge text={mapLockerStatus(value)} colorScheme={status()} />;
};

export const badgeRenderOrderStatus = (value: ORDER_STATUS | undefined) => {
  const color = () => {
    switch (value) {
      case ORDER_STATUS.INITIALIZED:
        return 'cyan';
      case ORDER_STATUS.WAITING:
        return 'lime';
      case ORDER_STATUS.COLLECTED:
        return 'amber';
      case ORDER_STATUS.PROCESSING:
        return 'violet';
      case ORDER_STATUS.PROCESSED:
        return 'teal';
      case ORDER_STATUS.RETURNED:
        return 'info';
      case ORDER_STATUS.COMPLETED:
        return 'success';
      case ORDER_STATUS.CANCELED:
        return 'error';
      case ORDER_STATUS.RESERVED:
        return 'default';
      case ORDER_STATUS.OVERTIME:
        return 'orange';
      case ORDER_STATUS.OVERTIME_PROCESSING:
        return 'gray';
      case ORDER_STATUS.UPDATING:
        return 'blue';
      default:
        return 'success';
    }
  };

  return <CustomBadge text={mapOrderStatus(value)} colorScheme={color()} />;
};

export const badgeRenderPaymentStatus = (value: PAYMENT_STATUS | undefined) => {
  const color = () => {
    switch (value) {
      case PAYMENT_STATUS.COMPLETED:
        return 'success';
      case PAYMENT_STATUS.CREATED:
        return 'cyan.300';
      case PAYMENT_STATUS.FAILED:
        return 'error';
      case PAYMENT_STATUS.PROCESSING:
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <CustomBadge
      text={mapPaymentStatus(value)}
      colorScheme={color()}
      size="3xs"
    />
  );
};

export const badgeRenderNotificationLevelTag = (
  level: NOTIFICATION_LEVEL | undefined,
) => {
  const color = () => {
    switch (level) {
      case NOTIFICATION_LEVEL.CRITICAL:
        return 'error';
      case NOTIFICATION_LEVEL.INFORMATION:
        return 'info';
      case NOTIFICATION_LEVEL.WARNING:
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <CustomBadge text={mapNotificationLevel(level)} colorScheme={color()} />
  );
};

export const badgeRenderBoxStatus = (value: BOX_STATUS | undefined) => {
  const color = () => {
    switch (value) {
      case BOX_STATUS.ACTIVE:
        return 'success';
      case BOX_STATUS.INACTIVE:
        return 'error';
      default:
        return 'info';
    }
  };

  return <CustomBadge text={mapBoxStatus(value)} colorScheme={color()} />;
};
