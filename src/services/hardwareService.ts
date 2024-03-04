import type {Response} from '../types';
import type {IHardwareItem} from '../types/hardware/hardware';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';

export const hardwareApi = createApi({
  reducerPath: 'hardwareApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  tagTypes: ['Hardware'],
  endpoints: build => ({
    // GET ALL HARDWARES
    hardwares: build.query<Response<IHardwareItem>, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getHardwareEndpoints(id).hardwares,
        method: 'GET',
      }),
      providesTags: [{type: 'Hardware', id: 'LIST'}],
    }),

    // CREATE HARDWARE
    createHardware: build.mutation<IHardwareItem, {id: number}>({
      query: ({id, ...data}) => ({
        url: endpoints.getHardwareEndpoints(id).hardwares,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'Hardware', id: 'LIST'}],
    }),

    // UPDATE HARDWARE
    updateHardware: build.mutation<
      {status: boolean},
      {id: number; hardwareId: number}
    >({
      query: ({id, hardwareId, ...data}) => ({
        url: endpoints.getHardwareEndpoints(id, hardwareId).hardwareById,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'Hardware', id: 'LIST'}],
    }),

    // DELETE HARDWARE
    deleteHardware: build.mutation<
      {status: boolean},
      {id: number; hardwareId: number}
    >({
      query: ({id, hardwareId, ...data}) => ({
        url: endpoints.getHardwareEndpoints(id, hardwareId).hardwareById,
        method: 'DELETE',
        data,
      }),
      invalidatesTags: [{type: 'Hardware', id: 'LIST'}],
    }),
  }),
});

export const {
  useHardwaresQuery,
  useCreateHardwareMutation,
  useUpdateHardwareMutation,
  useDeleteHardwareMutation,
} = hardwareApi;
