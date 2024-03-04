import type {PayloadAction} from '@reduxjs/toolkit';
import {AppState} from '.';
import {createSlice} from '@reduxjs/toolkit';
import {IWalletDeposit} from '../types/wallet/wallet';

interface WalletState {
  deposit: IWalletDeposit | undefined;
}

const initialState: WalletState = {
  deposit: undefined,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletDeposit(state, action: PayloadAction<IWalletDeposit | undefined>) {
      state.deposit = action.payload;
    },
  },
});

export const {setWalletDeposit} = walletSlice.actions;

export const selectWalletPaymentMethod = (state: AppState) =>
  state.wallet.deposit;

export default walletSlice.reducer;
