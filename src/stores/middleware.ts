import {addressApi} from '../services/addressService';
import {authApi} from '../services/authService';
import {boxApi} from '../services/boxService';
import {customerApi} from '../services/customerService';
import {dashboardApi} from '../services/dashboardService';
import {hardwareApi} from '../services/hardwareService';
import {lockerApi} from '../services/lockerService';
import {notificationApi} from '../services/notificationService';
import {orderApi} from '../services/orderService';
import {paymentApi} from '../services/paymentService';
import {serviceApi} from '../services/serviceService';
import {settingApi} from '../services/settingService';
import {staffApi} from '../services/staffService';
import {storeApi} from '../services/storeService';

export const middleware = [
  lockerApi.middleware,
  boxApi.middleware,
  serviceApi.middleware,
  hardwareApi.middleware,
  orderApi.middleware,
  dashboardApi.middleware,
  addressApi.middleware,
  authApi.middleware,
  storeApi.middleware,
  staffApi.middleware,
  settingApi.middleware,
  customerApi.middleware,
  notificationApi.middleware,
  paymentApi.middleware,
];
