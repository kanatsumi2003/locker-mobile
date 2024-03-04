import type {
  IShippingPriceItem,
  Settings,
  SettingsParams,
  UpdateSettingsParams,
} from '../types/setting';

import {createApi} from '@reduxjs/toolkit/dist/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';

export const settingApi = createApi({
  reducerPath: 'settingApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  tagTypes: ['Setting'],
  endpoints: builder => ({
    // GET ALL SETTINGS
    settings: builder.query<Settings, SettingsParams>({
      query: params => ({
        url: endpoints.getSettingEndpoints().setting,
        method: 'GET',
        params,
      }),
      providesTags: [{type: 'Setting', id: 'LIST'}],
    }),
    updateSettings: builder.mutation<Settings, UpdateSettingsParams>({
      query: data => ({
        url: endpoints.getSettingEndpoints().setting,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'Setting', id: 'LIST'}],
    }),
    // GET ALL PRICES
    shippingPrices: builder.query<IShippingPriceItem[], void>({
      query: () => ({
        url: endpoints.getShippingPriceEndpoints().prices,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSettingsQuery,
  useUpdateSettingsMutation,
  useShippingPricesQuery,
} = settingApi;
