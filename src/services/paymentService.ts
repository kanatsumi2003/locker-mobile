import type {Response} from '../types';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';
import {IPaymentItem, IPaymentParams} from '../types/bill/bill';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  endpoints: build => ({
    // GET ALL PAYMENTS
    payments: build.query<Response<IPaymentItem>, IPaymentParams>({
      query: params => ({
        url: endpoints.getPaymentEndpoints().payments,
        method: 'GET',
        params,
      }),
    }),

    // GET PAYMENT BY ID
    payment: build.query<IPaymentItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getPaymentEndpoints(id).paymentById,
        method: 'GET',
      }),
    }),
  }),
});

export const {usePaymentsQuery, usePaymentQuery} = paymentApi;
