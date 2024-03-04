import {PAYMENT_METHOD, PAYMENT_STATUS} from '../types/bill/bill';

export const paymentImageRender = (method?: PAYMENT_METHOD) => {
  switch (method) {
    case PAYMENT_METHOD.MOMO:
      return require('../assets/momo.png');
    case PAYMENT_METHOD.VNPAY:
      return require('../assets/vnpay.png');
    default:
      return require('../assets/cash.png');
  }
};
export const paymentStatusColorRender = (value: PAYMENT_STATUS | undefined) => {
  switch (value) {
    case PAYMENT_STATUS.COMPLETED:
      return 'success.500';
    case PAYMENT_STATUS.CREATED:
      return 'cyan.500';
    case PAYMENT_STATUS.FAILED:
      return 'error.500';
    case PAYMENT_STATUS.PROCESSING:
      return 'info.500';
    default:
      return 'default.500';
  }
};
