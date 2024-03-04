import type {PayloadAction} from '@reduxjs/toolkit';

import {createSlice} from '@reduxjs/toolkit';
import {ICreateOrderRequest, IOrderParams} from '../types/order/order';
import {AppState} from '.';
import {ILockerParams} from '../types/locker/locker';

interface OrderState {
  createOrderRequest?: Partial<ICreateOrderRequest>;
  orderNote: string;
  orderParams: IOrderParams;
  orderLockerParams?: {
    lockerId?: number;
    lockerName?: string;
  };
  rangePicker: {
    from: string | undefined;
    to: string | undefined;
  };
  lockerParams: ILockerParams;
}

const initialState: OrderState = {
  createOrderRequest: undefined,
  orderNote: '',
  orderParams: {pageNumber: 1, pageSize: 5},
  rangePicker: {
    from: undefined,
    to: undefined,
  },
  lockerParams: {pageNumber: 1, pageSize: 5},
  orderLockerParams: undefined,
};

const lockerSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCreateOrderRequest<
      T extends ICreateOrderRequest,
      K extends keyof ICreateOrderRequest,
    >(
      state: OrderState,
      action: PayloadAction<Pick<Partial<ICreateOrderRequest>, K>>,
    ) {
      state.createOrderRequest = {
        ...state.createOrderRequest,
        ...action.payload,
      };
    },
    setOrderNote(state, action: PayloadAction<string>) {
      state.orderNote = action.payload;
    },
    setOrderParams(state, action: PayloadAction<IOrderParams>) {
      state.orderParams = action.payload;
    },
    setOrderLockerParams(
      state,
      action: PayloadAction<{lockerId?: number; lockerName?: string}>,
    ) {
      state.orderLockerParams = action.payload;
    },
    setRangePicker(
      state,
      action: PayloadAction<{
        from: string | undefined;
        to: string | undefined;
      }>,
    ) {
      state.rangePicker = action.payload;
    },
    setLockerParams(state, action: PayloadAction<ILockerParams>) {
      state.lockerParams = action.payload;
    },
  },
});

export const {
  setCreateOrderRequest,
  setOrderNote,
  setRangePicker,
  setOrderParams,
  setLockerParams,
  setOrderLockerParams,
} = lockerSlice.actions;

export const selectCreateOrderRequest = (state: AppState) =>
  state.order.createOrderRequest;
export const selectOrderNote = (state: AppState) => state.order.orderNote;
export const selectOrderParams = (state: AppState) => state.order.orderParams;
export const selectRangePicker = (state: AppState) => state.order.rangePicker;
export const selectLockerParams = (state: AppState) => state.order.lockerParams;
export const selectOrderLockerParams = (state: AppState) =>
  state.order.orderLockerParams;

export default lockerSlice.reducer;
