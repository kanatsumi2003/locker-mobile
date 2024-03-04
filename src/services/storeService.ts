import type {Response} from '../types';
import type {
  ICreateStoreParams,
  IStoreItem,
  IStoreParams,
} from '../types/store/store';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';
import {
  IServiceItem,
  IServiceParams,
  SERVICE_STATUS,
} from '../types/service/service';

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  // keepUnusedDataFor: 5,
  tagTypes: ['Store', 'StoreDetail', 'Service', 'ServiceDetail'],
  endpoints: build => ({
    // GET ALL STORES
    stores: build.query<Response<IStoreItem>, IStoreParams>({
      query: params => ({
        url: endpoints.getStoreEndpoints().stores,
        method: 'GET',
        params,
      }),
      providesTags: [{type: 'Store', id: 'LIST'}],
    }),

    // CREATE STORE
    createStore: build.mutation<IStoreItem, ICreateStoreParams>({
      query: data => ({
        url: endpoints.getStoreEndpoints().stores,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'Store', id: 'LIST'}],
    }),

    // UPDATE STORE
    updateStore: build.mutation<IStoreItem, ICreateStoreParams & {id: number}>({
      query: ({id, ...data}) => ({
        url: endpoints.getStoreEndpoints(id).storeById,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [
        {type: 'Store', id: 'LIST'},
        {type: 'StoreDetail', id: 'DETAIL'},
      ],
    }),

    // CHANGE STORE STATUS
    updateStoreStatus: build.mutation<
      IStoreItem,
      Pick<IStoreItem, 'id' | 'status'>
    >({
      query: ({id, ...data}) => ({
        url: endpoints.getStoreEndpoints(id).storeByIdStatus,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'StoreDetail', id: 'DETAIL'}],
    }),

    // GET STORE BY ID
    store: build.query<IStoreItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getStoreEndpoints(id).storeById,
        method: 'GET',
      }),
      providesTags: [{type: 'StoreDetail', id: 'DETAIL'}],
    }),

    // GET ALL SERVICES
    services: build.query<
      Response<IServiceItem>,
      {storeId: number} & IServiceParams
    >({
      query: ({storeId, ...params}) => ({
        url: endpoints.getStoreEndpoints(storeId).services,
        method: 'GET',
        params,
      }),
      providesTags: [{type: 'Service', id: 'LIST'}],
    }),

    // CREATE SERVICE
    createService: build.mutation<
      IServiceItem,
      {storeId: number} & Omit<IServiceItem, 'id'>
    >({
      query: ({storeId, ...data}) => ({
        url: endpoints.getStoreEndpoints(storeId).services,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'Service', id: 'LIST'}],
    }),

    // UPDATE SERVICE
    updateService: build.mutation<
      IServiceItem,
      {storeId: number; serviceId: number}
    >({
      query: ({storeId, serviceId, ...data}) => ({
        url: endpoints.getStoreEndpoints(storeId, serviceId).serviceById,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [
        {type: 'Service', id: 'LIST'},
        {type: 'ServiceDetail', id: 'DETAIL'},
      ],
    }),

    // GET SERVICE BY ID
    service: build.query<IServiceItem, {storeId: number; serviceId: number}>({
      query: ({storeId, serviceId}) => ({
        url: endpoints.getStoreEndpoints(storeId, serviceId).serviceById,
        method: 'GET',
      }),
      providesTags: [{type: 'ServiceDetail', id: 'DETAIL'}],
    }),

    // UPDATE SERVICE STATUS BY ID
    updateServiceStatus: build.mutation<
      {status: boolean},
      {storeId: number; serviceId: number; status: SERVICE_STATUS}
    >({
      query: ({storeId, serviceId, ...data}) => ({
        url: endpoints.getStoreEndpoints(storeId, serviceId).serviceByIdStatus,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'ServiceDetail', id: 'DETAIL'}],
    }),
  }),
});

export const {
  useStoresQuery,
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useUpdateStoreStatusMutation,
  useStoreQuery,
  useServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useServiceQuery,
  useUpdateServiceStatusMutation,
} = storeApi;
