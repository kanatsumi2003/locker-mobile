import type {Response} from '../types';
import type {
  ILockerBody,
  ILockerItem,
  ILockerParams,
  ILockerStatisticItem,
  ILockerTimelineItem,
  ILockerTimelineParams,
} from '../types/locker/locker';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';
import {IStaffItem, IStaffParams} from '../types/staff/staff';
import {IServiceItem, IServiceParams} from '../types/service/service';

import qs from 'qs';

export const lockerApi = createApi({
  reducerPath: 'lockerApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  tagTypes: ['Locker', 'LockerDetail', 'Staff'],
  endpoints: build => ({
    // GET ALL LOCKERS
    lockers: build.query<Response<ILockerItem>, Partial<ILockerParams> | void>({
      query: params => ({
        url: endpoints.getLockerEndpoints().lockers,
        method: 'GET',
        params,
      }),
      providesTags: [{type: 'Locker', id: 'LIST'}],
    }),

    // GET LOCKER BY ID
    locker: build.query<ILockerItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getLockerEndpoints(id).lockerById,
        method: 'GET',
      }),
      providesTags: [{type: 'LockerDetail', id: 'DETAIL'}],
    }),

    // GET ALL STAFFS
    staffs: build.query<Response<IStaffItem>, IStaffParams>({
      query: params => ({
        url: endpoints.getStaffEndpoints().staff,
        method: 'GET',
        params,
      }),
      providesTags: [{type: 'Staff', id: 'LIST'}],
    }),

    // CREATE LOCKER
    createLocker: build.mutation<ILockerItem, ILockerBody>({
      query: data => ({
        url: endpoints.getLockerEndpoints().lockers,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'Locker', id: 'LIST'}],
    }),

    // UPDATE LOCKER
    updateLocker: build.mutation<{status: boolean}, ILockerBody & {id: number}>(
      {
        query: ({id, ...data}) => ({
          url: endpoints.getLockerEndpoints(id).lockerById,
          method: 'PUT',
          data,
        }),
        invalidatesTags: [
          {type: 'LockerDetail', id: 'DETAIL'},
          {type: 'Locker', id: 'LIST'},
          {type: 'Staff', id: 'LIST'},
        ],
      },
    ),

    // UPDATE LOCKER STATUS
    updateLockerStatus: build.mutation<
      {status: boolean},
      Pick<ILockerItem, 'id' | 'status'>
    >({
      query: ({id, ...data}) => ({
        url: endpoints.getLockerEndpoints(id).lockerByIdStatus,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [
        {type: 'Locker', id: 'LIST'},
        {type: 'LockerDetail', id: 'DETAIL'},
      ],
    }),

    // GET LOCKER TIMELINES BY ID
    lockerTimelines: build.query<
      Response<ILockerTimelineItem>,
      {id: number} & Partial<ILockerTimelineParams>
    >({
      query: ({id, ...params}) => ({
        url: endpoints.getLockerEndpoints(id).lockerByIdTimelines,
        method: 'GET',
        params,
      }),
    }),

    // GET LOCKER STATISTICS BY ID
    lockerStatistics: build.query<
      Array<ILockerStatisticItem>,
      {id: number} & Partial<ILockerTimelineParams>
    >({
      query: ({id, ...params}) => ({
        url: endpoints.getLockerEndpoints(id).lockerByIdStatistics,
        method: 'GET',
        params,
      }),
    }),

    // ADD STAFFS TO LOCKER
    addStaffToLocker: build.mutation<
      {status: boolean},
      {id: number; staffIds: number[]}
    >({
      query: ({id, ...data}) => ({
        url: endpoints.getLockerEndpoints(id).staffsByLocker,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'Staff', id: 'LIST'}],
    }),

    // REMOVE STAFF OUT OF LOCKERS
    removeStaffOutOfLocker: build.mutation<
      IStaffItem,
      {id: number; lockerIds: number[]}
    >({
      query: ({id, ...data}) => ({
        url: endpoints.getStaffEndpoints().staffByIdLockers(id),
        method: 'DELETE',
        data,
      }),
      invalidatesTags: [{type: 'Staff', id: 'LIST'}],
    }),

    // GET SERVICES BY LOCKER
    servicesByLocker: build.query<
      Response<IServiceItem>,
      {id: number} & IServiceParams
    >({
      query: ({id, ...params}) => ({
        url: endpoints.getLockerEndpoints(id).servicesByLocker,
        method: 'GET',
        params,
        paramsSerializer: params =>
          qs.stringify(params, {arrayFormat: 'repeat'}),
      }),
    }),
  }),
});

export const {
  useLockersQuery,
  useStaffsQuery,
  useCreateLockerMutation,
  useLockerQuery,
  useUpdateLockerMutation,
  useUpdateLockerStatusMutation,
  useLockerTimelinesQuery,
  useLockerStatisticsQuery,
  useAddStaffToLockerMutation,
  useRemoveStaffOutOfLockerMutation,
  useServicesByLockerQuery,
} = lockerApi;
