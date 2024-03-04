import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';
import {IWalleDepositResponse, IWalletDeposit} from '../types/wallet/wallet';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  endpoints: build => ({
    // CREATE WALLET DEPOSIT
    walletDeposit: build.mutation<IWalleDepositResponse, IWalletDeposit>({
      query: data => ({
        url: endpoints.getWalletEndpoints().walletDeposit,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const {useWalletDepositMutation} = paymentApi;
