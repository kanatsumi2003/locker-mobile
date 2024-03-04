import type {Response} from '../types';
import type {
  IAddOrderDetailBody,
  ICreateOrderRequest,
  IDetailItem,
  IDetailItemServiceItem,
  IEditOrderDetailBody,
  IOrderDetailItem,
  IOrderItem,
  IOrderNote,
  IOrderParams,
} from '../types/order/order';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';
import {IBillItem, PAYMENT_METHOD} from '../types/bill/bill';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  tagTypes: ['Order', 'OrderDetail'],
  endpoints: build => ({
    // GET ALL ORDERS
    orders: build.query<Response<IOrderItem>, Partial<IOrderParams> | void>({
      query: params => ({
        url: endpoints.getOrderEndpoints().orders,
        method: 'GET',
        params,
      }),
      providesTags: [{type: 'Order', id: 'LIST'}],
    }),

    // GET ORDER BY ID
    order: build.query<IOrderItem & IOrderDetailItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getOrderEndpoints(id).orderById,
        method: 'GET',
      }),
      providesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),

    // CREATE ORDER
    createOrder: build.mutation<IDetailItem, Partial<ICreateOrderRequest>>({
      query: data => ({
        url: endpoints.getOrderEndpoints().orders,
        method: 'POST',
        data,
      }),
    }),

    // EDIT SERVICE IN ORDER DETAIL
    editServiceQuantity: build.mutation<
      IDetailItem,
      {id: number; detailId: number; quantity: number}
    >({
      query: ({id, detailId, ...data}) => ({
        url: endpoints.getOrderEndpoints(id, detailId).orderByDetailId,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),

    // DELETE SERVICE IN ORDER DETAIL
    deleteService: build.mutation<IDetailItem, {id: number; detailId: number}>({
      query: ({id, detailId}) => ({
        url: endpoints.getOrderEndpoints(id, detailId).orderByDetailId,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),

    // ADD SERVICES IN ORDER DETAIL
    addServices: build.mutation<
      {status: boolean},
      {id: number} & IAddOrderDetailBody
    >({
      query: ({id, ...data}) => ({
        url: endpoints.getOrderEndpoints(id).orderDetails,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),

    // COLLECT ORDER
    collectOrder: build.mutation<IOrderItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getOrderEndpoints(id).orderCollect,
        method: 'PUT',
      }),
      invalidatesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),

    // PROCESS ORDER
    processOrder: build.mutation<IOrderItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getOrderEndpoints(id).orderProcess,
        method: 'PUT',
      }),
      invalidatesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),

    // RETURN ORDER
    returnOrder: build.mutation<IOrderItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getOrderEndpoints(id).orderReturn,
        method: 'PUT',
      }),
      invalidatesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),

    // CONFIRM ORDER
    confirmOrder: build.mutation<IOrderItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getOrderEndpoints(id).orderConfirm,
        method: 'PUT',
      }),
      invalidatesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),

    // CHECKOUT ORDER
    checkoutOrder: build.mutation<IOrderItem, {id: number}>({
      query: ({id, ...data}) => ({
        url: endpoints.getOrderEndpoints(id).orderCheckout,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),

    // GET ORDER BILL
    orderBill: build.query<IBillItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getOrderEndpoints(id).orderBill,
        method: 'GET',
      }),
    }),

    // ADD ITEM TO ORDER DETAIL
    addOrderDetailServiceItem: build.mutation<
      IDetailItemServiceItem,
      Omit<IDetailItemServiceItem, 'id'> & {orderId: number; detailId: number}
    >({
      query: ({orderId, detailId, ...data}) => ({
        url: endpoints.getOrderEndpoints(orderId, detailId)
          .orderByDetailIdItems,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),

    // UPDATE ORDER DESCRIPTION
    updateOrderDescription: build.mutation<
      IOrderItem,
      {id: number} & IOrderNote
    >({
      query: ({id, ...data}) => ({
        url: endpoints.getOrderEndpoints(id).orderById,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),

    // CANCEL ORDER
    cancelOrder: build.mutation<IOrderItem, {id: number}>({
      query: ({id}) => ({
        url: endpoints.getOrderEndpoints(id).orderCancel,
        method: 'PUT',
      }),
      invalidatesTags: [{type: 'OrderDetail', id: 'DETAIL'}],
    }),
  }),
});

export const {
  useOrdersQuery,
  useOrderQuery,
  useEditServiceQuantityMutation,
  useDeleteServiceMutation,
  useAddServicesMutation,
  useCollectOrderMutation,
  useProcessOrderMutation,
  useReturnOrderMutation,
  useConfirmOrderMutation,
  useCreateOrderMutation,
  useCheckoutOrderMutation,
  useOrderBillQuery,
  useAddOrderDetailServiceItemMutation,
  useUpdateOrderDescriptionMutation,
  useCancelOrderMutation,
} = orderApi;
