import type {Response} from '../types';
import type {
  ICreateStaffParams,
  IStaffItem,
  IStaffParams,
} from '../types/staff/staff';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';

export const staffApi = createApi({
  reducerPath: 'staffApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  tagTypes: ['Staff', 'StaffDetail'],
  endpoints: build => ({
    // GET ALL STAFF
    staffs: build.query<Response<IStaffItem>, IStaffParams>({
      query: params => ({
        url: endpoints.getStaffEndpoints().staff,
        method: 'GET',
        params,
      }),
      providesTags: [{type: 'Staff', id: 'LIST'}],
    }),

    // CREATE STAFF
    createStaff: build.mutation<IStaffItem, ICreateStaffParams>({
      query: data => ({
        url: endpoints.getStaffEndpoints().staff,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'Staff', id: 'LIST'}],
    }),

    // UPDATE STAFF
    updateStaff: build.mutation<IStaffItem, ICreateStaffParams & {id: number}>({
      query: ({id, ...data}) => ({
        url: endpoints.getStaffEndpoints().staffById(id),
        method: 'PUT',
        data,
      }),
      invalidatesTags: [
        {type: 'Staff', id: 'LIST'},
        {type: 'StaffDetail', id: 'DETAIL'},
      ],
    }),

    // CHANGE STAFF STATUS
    updateStaffStatus: build.mutation<
      IStaffItem,
      Pick<IStaffItem, 'id' | 'status'>
    >({
      query: ({id, ...data}) => ({
        url: endpoints.getStaffEndpoints().staffByIdStatus(id),
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'StaffDetail', id: 'DETAIL'}],
    }),

    // GET STAFF BY ID
    staffById: build.query<IStaffItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getStaffEndpoints().staffById(id),
        method: 'GET',
      }),
      providesTags: [{type: 'StaffDetail', id: 'DETAIL'}],
    }),
  }),
});

export const {
  useStaffsQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useUpdateStaffStatusMutation,
  useStaffByIdQuery,
} = staffApi;
