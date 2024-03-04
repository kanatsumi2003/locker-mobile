import type {Response} from '../types';
import type {
  ICreateCustomerParams,
  ICustomerItem,
  ICustomerParams,
} from '../types/customer/customer';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  tagTypes: ['customer', 'customerDetail'],
  endpoints: build => ({
    // GET ALL customer
    customers: build.query<Response<ICustomerItem>, ICustomerParams>({
      query: params => ({
        url: endpoints.getCustomerEndpoints().customer,
        method: 'GET',
        params,
      }),
      providesTags: [{type: 'customer', id: 'LIST'}],
    }),

    // CREATE customer
    createCustomer: build.mutation<ICustomerItem, ICreateCustomerParams>({
      query: data => ({
        url: endpoints.getCustomerEndpoints().customer,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'customer', id: 'LIST'}],
    }),

    // UPDATE customer
    updateCustomer: build.mutation<
      ICustomerItem,
      ICreateCustomerParams & {id: number}
    >({
      query: ({id, ...data}) => ({
        url: endpoints.getCustomerEndpoints().customerById(id),
        method: 'PUT',
        data,
      }),
      invalidatesTags: [
        {type: 'customer', id: 'LIST'},
        {type: 'customerDetail', id: 'DETAIL'},
      ],
    }),

    // CHANGE customer STATUS
    updateCustomerStatus: build.mutation<
      ICustomerItem,
      Pick<ICustomerItem, 'id' | 'status'>
    >({
      query: ({id, ...data}) => ({
        url: endpoints.getCustomerEndpoints().customerByIdStatus(id),
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'customerDetail', id: 'DETAIL'}],
    }),

    // GET customer BY ID
    customerById: build.query<ICustomerItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getCustomerEndpoints().customerById(id),
        method: 'GET',
      }),
      providesTags: [{type: 'customerDetail', id: 'DETAIL'}],
    }),
  }),
});

export const {
  useCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useUpdateCustomerStatusMutation,
  useCustomerByIdQuery,
} = customerApi;
