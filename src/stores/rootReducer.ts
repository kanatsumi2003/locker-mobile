import {combineReducers} from '@reduxjs/toolkit';

import {addressApi} from '../services/addressService';
import {authApi} from '../services/authService';
import {boxApi} from '../services/boxService';
import {customerApi} from '../services/customerService';
import {dashboardApi} from '../services/dashboardService';
import {hardwareApi} from '../services/hardwareService';
import {lockerApi} from '../services/lockerService';
import {orderApi} from '../services/orderService';
import {serviceApi} from '../services/serviceService';
import {settingApi} from '../services/settingService';
import {staffApi} from '../services/staffService';
import {storeApi} from '../services/storeService';

import globalReducer from './global.store';
import lockerReducer from './locker.store';
import orderReducer from './order.store';
import tableReducer from './table.store';
import walletReducer from './wallet.store';
import {notificationApi} from '../services/notificationService';
import {paymentApi} from '../services/paymentService';

const rootReducer = combineReducers({
  global: globalReducer,
  table: tableReducer,
  locker: lockerReducer,
  order: orderReducer,
  wallet: walletReducer,
  [lockerApi.reducerPath]: lockerApi.reducer,
  [hardwareApi.reducerPath]: hardwareApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [boxApi.reducerPath]: boxApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
});

export default rootReducer;
