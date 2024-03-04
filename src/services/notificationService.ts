import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';
import {
  INotificationItem,
  INotificationParams,
  IUnreadCountItem,
} from '../types/notification/notification';
import {Response} from '../types';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  tagTypes: ['Notification'],
  endpoints: build => ({
    notifications: build.query<
      Response<INotificationItem>,
      Partial<INotificationParams> | void
    >({
      query: params => ({
        url: endpoints.getNotificationEndpoints().notifications,
        method: 'GET',
        params,
      }),
      providesTags: [{type: 'Notification', id: 'LIST'}],
    }),
    readNotification: build.mutation<INotificationItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getNotificationEndpoints(id).notificationById,
        method: 'PUT',
        data: {
          isRead: true,
        },
      }),
      invalidatesTags: [{type: 'Notification', id: 'LIST'}],
    }),
    unreadCount: build.query<IUnreadCountItem, void>({
      query: () => ({
        url: endpoints.getNotificationEndpoints().unreadCount,
        method: 'GET',
      }),
      providesTags: [{type: 'Notification'}],
    }),
  }),
});

export const {
  useNotificationsQuery,
  useReadNotificationMutation,
  useUnreadCountQuery,
  useLazyUnreadCountQuery,
} = notificationApi;
