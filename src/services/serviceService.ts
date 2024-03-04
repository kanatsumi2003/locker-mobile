import type {Response} from '../types';
import type {
  IServiceItem,
  IServiceParams,
  SERVICE_STATUS,
} from '../types/service/service';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  tagTypes: ['Service', 'ServiceDetail'],
  endpoints: build => ({
    // GET ALL SERVICES
    services: build.query<Response<IServiceItem>, IServiceParams | void>({
      query: params => ({
        url: endpoints.getServiceEndpoints().services,
        method: 'GET',
        params,
      }),
      providesTags: [{type: 'Service', id: 'LIST'}],
    }),

    // CREATE SERVICE
    createService: build.mutation<IServiceItem, Omit<IServiceItem, 'id'>>({
      query: data => ({
        url: endpoints.getServiceEndpoints().services,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'Service', id: 'LIST'}],
    }),

    // UPDATE SERVICE
    updateService: build.mutation<IServiceItem, {id: number}>({
      query: ({id, ...data}) => ({
        url: endpoints.getServiceEndpoints(id).serviceById,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [
        {type: 'Service', id: 'LIST'},
        {type: 'ServiceDetail', id: 'DETAIL'},
      ],
    }),

    // GET SERVICE BY ID
    service: build.query<IServiceItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getServiceEndpoints(id).serviceById,
        method: 'GET',
      }),
      providesTags: [{type: 'ServiceDetail', id: 'DETAIL'}],
    }),

    // UPDATE SERVICE STATUS BY ID
    updateServiceStatus: build.mutation<
      {status: boolean},
      {id: number; status: SERVICE_STATUS}
    >({
      query: ({id, ...data}) => ({
        url: endpoints.getServiceEndpoints(id).serviceByIdStatus,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'ServiceDetail', id: 'DETAIL'}],
    }),
  }),
});

export const {
  useServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useServiceQuery,
  useUpdateServiceStatusMutation,
} = serviceApi;
