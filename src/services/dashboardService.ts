import type {Response} from '../types';
import type {
  IDashboardLockerItem,
  IDashboardLockerLocationItem,
  IDashboardOrderItem,
  IDashboardOverviewItem,
  IDashboardRevenueItem,
  IDashboardStoreItem,
} from '../types/dashboard/dashboard';
import type {
  IDashboardParams,
  IDashboardStoreParams,
} from '../types/order/order';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  tagTypes: ['Dashboard'],
  endpoints: build => ({
    dashboardOverview: build.query<
      IDashboardOverviewItem,
      IDashboardParams | void
    >({
      query: params => ({
        url: endpoints.getDashboardEndPoints().overview,
        method: 'GET',
        params,
      }),
    }),
    dashboardStores: build.query<
      Response<IDashboardStoreItem>,
      IDashboardStoreParams | void
    >({
      query: params => ({
        url: endpoints.getDashboardEndPoints().stores,
        method: 'GET',
        params,
      }),
    }),
    dashboardRevenue: build.query<
      Array<IDashboardRevenueItem>,
      IDashboardParams | void
    >({
      query: params => ({
        url: endpoints.getDashboardEndPoints().revenue,
        method: 'GET',
        params: {
          ...params,
        },
      }),
    }),
    dashboardLockers: build.query<
      Array<IDashboardLockerItem>,
      IDashboardParams | void
    >({
      query: params => ({
        url: endpoints.getDashboardEndPoints().lockers,
        method: 'GET',
        params,
      }),
    }),
    dashboardLockerLocations: build.query<
      Array<IDashboardLockerLocationItem>,
      IDashboardParams | void
    >({
      query: params => ({
        url: endpoints.getDashboardEndPoints().lockerLocations,
        method: 'GET',
        params,
      }),
    }),
    dashboardOrders: build.query<IDashboardOrderItem, IDashboardParams | void>({
      query: params => ({
        url: endpoints.getDashboardEndPoints().orders,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useDashboardOrdersQuery,
  useDashboardOverviewQuery,
  useDashboardLockersQuery,
  useDashboardStoresQuery,
  useDashboardRevenueQuery,
  useDashboardLockerLocationsQuery,
} = dashboardApi;
