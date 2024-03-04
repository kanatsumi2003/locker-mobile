import type {PayloadAction} from '@reduxjs/toolkit';

import {createSlice} from '@reduxjs/toolkit';
import {IProfile} from '../types/auth/profile';
import {AppState} from '.';
import {ModalStore} from '../types/modal';
import {IResetPassFormData} from '../types/auth/login';

interface State {
  userInfo: IProfile | null;
  modal: ModalStore;
  phoneNumber: string;
  resetPassFormData: IResetPassFormData | null;
  newNotifications:
    | {screen: string; content: string; title: string}
    | null
    | undefined;
  unreadNotificationCount: number;
}

const initialState: State = {
  userInfo: null,
  modal: {
    type: null,
    isOpen: false,
  },
  phoneNumber: '',
  resetPassFormData: null,
  newNotifications: null,
  unreadNotificationCount: 0,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<IProfile | null>) {
      state!.userInfo = action.payload;
    },
    setOpenModal(state, action: PayloadAction<Omit<ModalStore, 'isOpen'>>) {
      state.modal = {
        ...action.payload,
        isOpen: true,
      };
    },
    setCloseModal(state) {
      state.modal = {
        type: null,
        isOpen: false,
      };
    },
    setCustomerPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    setResetPassFormData(
      state,
      action: PayloadAction<IResetPassFormData | null>,
    ) {
      state.resetPassFormData = action.payload;
    },
    setNewNotifications(
      state,
      action: PayloadAction<
        {screen: string; content: string; title: string} | null | undefined
      >,
    ) {
      state.newNotifications = action.payload;
    },
    setUnreadNotificationCount(state, action: PayloadAction<number>) {
      state.unreadNotificationCount = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setOpenModal,
  setCloseModal,
  setCustomerPhoneNumber,
  setResetPassFormData,
  setNewNotifications,
  setUnreadNotificationCount,
} = globalSlice.actions;

export const selectUserInfo = (state: AppState) => state.global.userInfo;
export const selectModal = (state: AppState) => state.global.modal;
export const selectCustomerPhoneNumber = (state: AppState) =>
  state.global.phoneNumber;
export const selectResetPassFormData = (state: AppState) =>
  state.global.resetPassFormData;
export const selectNewNotifications = (state: AppState) =>
  state.global.newNotifications;
export const selectUnreadNotificationCount = (state: AppState) =>
  state.global.unreadNotificationCount;

export default globalSlice.reducer;
