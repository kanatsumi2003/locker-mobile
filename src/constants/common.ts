export const LOCAL_STORAGE_ITEMS = Object.freeze({
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  FCM_TOKEN: 'fcmToken',
});

export const TIME_FORMAT = 'HH:mm:ss';
export const FULL_TIME_FORMAT = 'HH:mm:ss DD/MM/YYYY';
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'HH:mm DD/MM/YYYY';

export const SCREEN = Object.freeze({
  TAB_STACK_STAFF: 'TabStackStaff',
  TAB_STACK_CUSTOMER: 'TabStackCustomer',
  VERIFY_CUSTOMER: 'VerifyCustomer',
  LOGIN_STAFF: 'LoginStaff',
  LOGIN_CUSTOMER: 'LoginCustomer',
  RESET_PASS_STAFF: 'ResetPassStaff',
  TAB_STAFF_HOME: 'Home',
  STAFF_HOME: 'StaffHome',
  LOGIN: 'Login',
  HOME: 'Home',
  DASHBOARD: '/dashboard',
  LOCKER: '/lockers',
  LOCKER_DETAIL: '/lockers/:id',
  ORDER: '/orders',
  STORE: '/stores',
  STORE_DETAIL: '/stores/:id',
  STORE_SERVICE_DETAIL: '/stores/:id/services/:serviceId',
  SERVICE: '/services',
  SERVICE_DETAIL: '/services/:id',
  ORDER_DETAIL: '/orders/:id',
  STAFF: '/staffs',
  STAFF_DETAIL: '/staffs/:id',
  SETTING: '/settings',
  NOTIFICATION: '/notifications',
  CUSTOMER: '/customers',
  CUSTOMER_DETAIL: '/customers/:id',
});

export const ICON = Object.freeze({
  DASHBOARD: 'dashboard',
  STORE: 'store',
  LOCKER: 'locker',
  SERVICE: 'service',
  ORDER: 'order',
  STAFF: 'staff',
  SETTING: 'setting',
  NOTIFICATION: 'notifications',
  CUSTOMER: 'customer',
});

export const STATUS_CODE = Object.freeze({
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  NOT_ALLOWED: 403,
  INTERNAL_SERVER_ERROR: 500,
});

export const CURRENCY_UNIT = {
  VI: 'VND',
};

export const DRAWER_FLAG = Object.freeze({
  DETAILS: 'details',
  STAFFS: 'staffs',
});

export const NOTIFICATION_HUB = Object.freeze({
  RECEIVE_MESSAGE: 'ReceiveNotification',
  CONNECT: 'Connect',
});

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PASSWORD_REGEX_GENERATOR =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;

export const PHONE_NUMBER_REGEX = /^(?:\+84|84|0)[35789]\d{8}$/g;

export const ERROR_CODE_UPDATE_PASS = 28;
export const ERROR_CODE_MISSING_OTP = 2;

export const DEFAULT_PRICE_PAYMENT_METHOD_CONDITION = 10000;

export const DEFAULT_VIET_NAM_REGION = Object.freeze({
  latitude: 14.0583,
  longitude: 108.2772,
  latitudeDelta: 6.0,
  longitudeDelta: 6.0,
});

export const REPLACE_TO_NUMERIC_REG = /[^0-9.]/g;
