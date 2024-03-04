import type {IAddress} from '../types/location/location';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  endpoints: build => ({
    addresses: build.query<
      IAddress[],
      Partial<Pick<IAddress, 'parentCode'>> | void
    >({
      query: params => ({
        url: endpoints.getAddressEndpoints().addresses,
        method: 'GET',
        params,
      }),
    }),
    map: build.query<any, {q: string}>({
      query: params => ({
        url: endpoints.getAddressEndpoints(params.q).geoLocation,
        method: 'GET',
      }),
    }),
  }),
});

export const {useAddressesQuery, useLazyMapQuery} = addressApi;
