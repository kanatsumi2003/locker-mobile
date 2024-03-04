import {ORDER_STATUS, ORDER_TYPE} from '../types/order/order';

export const orderTypeImageRender = (type?: ORDER_TYPE) => {
  switch (type) {
    case ORDER_TYPE.LAUNDRY:
      return require('../assets/laundry-order.png');
    case ORDER_TYPE.STORAGE:
      return require('../assets/storage.png');
    default:
      return require('../assets/locker-empty.png');
  }
};

export const orderStatusColorRender = (value: ORDER_STATUS | undefined) => {
  switch (value) {
    case ORDER_STATUS.INITIALIZED:
      return 'cyan.500';
    case ORDER_STATUS.WAITING:
      return 'lime.500';
    case ORDER_STATUS.COLLECTED:
      return 'amber.500';
    case ORDER_STATUS.PROCESSING:
      return 'violet.500';
    case ORDER_STATUS.PROCESSED:
      return 'teal.500';
    case ORDER_STATUS.RETURNED:
      return 'info.500';
    case ORDER_STATUS.COMPLETED:
      return 'success.500';
    case ORDER_STATUS.CANCELED:
      return 'error.500';
    case ORDER_STATUS.RESERVED:
      return 'primary.500';
    case ORDER_STATUS.OVERTIME:
      return 'orange.500';
    case ORDER_STATUS.OVERTIME_PROCESSING:
      return 'gray.500';
    case ORDER_STATUS.UPDATING:
      return 'blue.500';
    default:
      return 'green.500';
  }
};

export const orderStatusBoxBackgroundColorRender = (
  value: ORDER_STATUS | undefined,
) => {
  switch (value) {
    case ORDER_STATUS.INITIALIZED:
      return 'cyan.50';
    case ORDER_STATUS.WAITING:
      return 'lime.50';
    case ORDER_STATUS.COLLECTED:
      return 'amber.50';
    case ORDER_STATUS.PROCESSING:
      return 'violet.50';
    case ORDER_STATUS.PROCESSED:
      return 'teal.50';
    case ORDER_STATUS.RETURNED:
      return 'info.50';
    case ORDER_STATUS.COMPLETED:
      return 'success.50';
    case ORDER_STATUS.CANCELED:
      return 'error.50';
    case ORDER_STATUS.RESERVED:
      return 'primary.50';
    case ORDER_STATUS.OVERTIME:
      return 'orange.50';
    case ORDER_STATUS.OVERTIME_PROCESSING:
      return 'gray.50';
    case ORDER_STATUS.UPDATING:
      return 'blue.50';
    default:
      return 'green.50';
  }
};
