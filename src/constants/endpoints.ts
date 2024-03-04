const BASE_URL = process.env.RN_API_LOCKERS || '';
const BASE_URL_LOCKER = BASE_URL + '/lockers';
const BASE_URL_ORDER = BASE_URL + '/orders';
const BASE_URL_DASHBOARD = BASE_URL + '/dashboard';
const BASE_URL_ADDRESS = BASE_URL + '/addresses';
const BASE_URL_AUTH = BASE_URL + '/auth';
const BASE_URL_SERVICE = BASE_URL + '/services';
const BASE_URL_STAFF = BASE_URL + '/staffs';
const BASE_URL_CUSTOMER = BASE_URL + '/customers';
const BASE_URL_STORE = BASE_URL + '/stores';
const BASE_URL_SETTING = BASE_URL + '/settings';
const BASE_URL_NOTIFICATION = BASE_URL + '/notifications';
const BASE_URL_PAYMENTS = BASE_URL + '/payments';
const BASE_URL_WALLET = BASE_URL + '/wallets';
const BASE_URL_NOTIFICATION_HUB = process.env.RN_API_NOTIFICATION_URL;
const BASE_URL_GEOLOCATION = process.env.RN_API_GEOLOCATION;
const BASE_URL_SHIPPING_PRICE = BASE_URL + '/shipping-prices';

export const BASE_URL_FILE = BASE_URL + '/files';

const getAuthEndPoints = () => {
  const STAFF_AUTH_URL = BASE_URL_AUTH + '/staff';
  const CUSTOMER_AUTH_URL = BASE_URL_AUTH + '/customer';

  return {
    staffLogin: `${STAFF_AUTH_URL}/login`,
    staffProfile: `${STAFF_AUTH_URL}/profile`,
    customerVerify: `${CUSTOMER_AUTH_URL}/verify`,
    customerLogin: `${CUSTOMER_AUTH_URL}/login`,
    customerProfile: `${CUSTOMER_AUTH_URL}/profile`,
    refreshToken: `${BASE_URL_AUTH}/refresh`,
    changePassword: `${BASE_URL_AUTH}/password`,
    resetPassword: `${BASE_URL_AUTH}/password/reset`,
    device: `${BASE_URL_AUTH}/device-token`,
    logout: `${BASE_URL_AUTH}/logout`,
  };
};

const getStoreEndpoints = (id?: number, serviceId?: number) => {
  return {
    stores: `${BASE_URL_STORE}`,
    storeById: `${BASE_URL_STORE}/${id}`,
    storeByIdStatus: `${BASE_URL_STORE}/${id}/status`,
    services: `${BASE_URL_STORE}/${id}/services`,
    serviceById: `${BASE_URL_STORE}/${id}/services/${serviceId}`,
    serviceByIdStatus: `${BASE_URL_STORE}/${id}/services/${serviceId}/status`,
  };
};

const getLockerEndpoints = (id?: number) => {
  return {
    lockers: `${BASE_URL_LOCKER}`,
    lockerById: `${BASE_URL_LOCKER}/${id}`,
    lockerWithStaffs: `${BASE_URL_LOCKER}/${id}/staffs`,
    lockerByIdStatus: `${BASE_URL_LOCKER}/${id}/status`,
    lockerByIdBoxes: `${BASE_URL_LOCKER}/${id}/boxes`,
    lockerByIdTimelines: `${BASE_URL_LOCKER}/${id}/timelines`,
    lockerByIdStatistics: `${BASE_URL_LOCKER}/${id}/statistics`,
    staffsByLocker: `${BASE_URL_LOCKER}/${id}/staffs`,
    servicesByLocker: `${BASE_URL_LOCKER}/${id}/services`,
    openBox: `${BASE_URL_LOCKER}/${id}/boxes/open`,
  };
};

const getHardwareEndpoints = (id: number, hardwareId?: number) => {
  return {
    hardwares: `${BASE_URL_LOCKER}/${id}/hardwares`,
    hardwareById: `${BASE_URL_LOCKER}/${id}/hardwares/${hardwareId}`,
  };
};

const getServiceEndpoints = (id?: number) => {
  return {
    services: `${BASE_URL_SERVICE}`,
    serviceById: `${BASE_URL_SERVICE}/${id}`,
    serviceByIdStatus: `${BASE_URL_SERVICE}/${id}/status`,
  };
};

const getOrderEndpoints = (id?: number, detailId?: number) => {
  return {
    orders: `${BASE_URL_ORDER}`,
    orderById: `${BASE_URL_ORDER}/${id}`,
    orderDetails: `${BASE_URL_ORDER}/${id}/details`,
    orderByDetailId: `${BASE_URL_ORDER}/${id}/details/${detailId}`,
    orderCollect: `${BASE_URL_ORDER}/${id}/collect`,
    orderProcess: `${BASE_URL_ORDER}/${id}/process`,
    orderReturn: `${BASE_URL_ORDER}/${id}/return`,
    orderConfirm: `${BASE_URL_ORDER}/${id}/confirm`,
    orderCheckout: `${BASE_URL_ORDER}/${id}/checkout`,
    orderBill: `${BASE_URL_ORDER}/${id}/bill`,
    orderByDetailIdItems: `${BASE_URL_ORDER}/${id}/details/${detailId}/items`,
    orderCancel: `${BASE_URL_ORDER}/${id}/cancel`,
  };
};

const getAddressEndpoints = (q?: string) => {
  return {
    addresses: BASE_URL_ADDRESS,
    geoLocation: BASE_URL_GEOLOCATION + (q ? `&q=${q}` : ''),
  };
};

const getStaffEndpoints = () => {
  return {
    staff: `${BASE_URL_STAFF}`,
    staffById: (id: number) => `${BASE_URL_STAFF}/${id}`,
    staffByIdStatus: (id: number) => `${BASE_URL_STAFF}/${id}/status`,
    staffByIdLockers: (id: number) => `${BASE_URL_STAFF}/${id}/lockers`,
  };
};

const getCustomerEndpoints = () => {
  return {
    customer: `${BASE_URL_CUSTOMER}`,
    customerById: (id: number) => `${BASE_URL_CUSTOMER}/${id}`,
    customerByIdStatus: (id: number) => `${BASE_URL_CUSTOMER}/${id}/status`,
  };
};

const getDashboardEndPoints = () => {
  return {
    overview: `${BASE_URL_DASHBOARD}/overview`,
    stores: `${BASE_URL_DASHBOARD}/stores`,
    revenue: `${BASE_URL_DASHBOARD}/revenue`,
    lockers: `${BASE_URL_DASHBOARD}/lockers`,
    lockerLocations: `${BASE_URL_DASHBOARD}/lockers/locations`,
    orders: `${BASE_URL_DASHBOARD}/orders`,
  };
};

const getSettingEndpoints = () => {
  return {
    setting: `${BASE_URL_SETTING}`,
  };
};

const getNotificationEndpoints = (id?: number) => {
  return {
    notifications: `${BASE_URL_NOTIFICATION}`,
    notificationById: `${BASE_URL_NOTIFICATION}/${id}`,
    unreadCount: `${BASE_URL_NOTIFICATION}/unread-count`,
  };
};

const getNotificationHubEndpoints = (accountId?: number) => {
  return {
    hub: `${BASE_URL_NOTIFICATION_HUB}?accountId=${accountId}`,
  };
};

const getPaymentEndpoints = (id?: number) => {
  return {
    payments: `${BASE_URL_PAYMENTS}`,
    paymentById: `${BASE_URL_PAYMENTS}/${id}`,
  };
};

const getWalletEndpoints = () => {
  return {
    walletDeposit: `${BASE_URL_WALLET}/deposit`,
  };
};

const getShippingPriceEndpoints = () => {
  return {
    prices: `${BASE_URL_SHIPPING_PRICE}`,
    priceById: (id: number) => `${BASE_URL_SHIPPING_PRICE}/${id}`,
  };
};

const endpoints = {
  getAuthEndPoints,
  getStoreEndpoints,
  getLockerEndpoints,
  getHardwareEndpoints,
  getServiceEndpoints,
  getOrderEndpoints,
  getAddressEndpoints,
  getStaffEndpoints,
  getDashboardEndPoints,
  getSettingEndpoints,
  getNotificationEndpoints,
  getCustomerEndpoints,
  getNotificationHubEndpoints,
  getPaymentEndpoints,
  getWalletEndpoints,
  getShippingPriceEndpoints,
};

export default endpoints;
