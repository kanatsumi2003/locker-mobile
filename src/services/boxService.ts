import type {IBoxItem, IEmergencyOpenBoxBody} from '../types/box/box';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';

export const boxApi = createApi({
  reducerPath: 'boxApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  endpoints: build => ({
    boxes: build.query<IBoxItem[], {id: number}>({
      query: ({id}) => ({
        url: endpoints.getLockerEndpoints(id).lockerByIdBoxes,
        method: 'GET',
      }),
    }),
    openBox: build.mutation<
      {status: boolean},
      {id: number} & IEmergencyOpenBoxBody
    >({
      query: ({id, ...data}) => ({
        url: endpoints.getLockerEndpoints(id).openBox,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const {useBoxesQuery, useOpenBoxMutation} = boxApi;
