import type {
  ILoginStaffParams,
  ILoginResponse,
  ILoginCustomerParams,
  IVerifyCustomerParams,
  IVerifyCustomerResponse,
  IChangePassRequest,
  IResetPassRequest,
  UpdateProfileParams,
  IDeviceResponse,
  IDeviceParams,
} from '../types/auth/login';
import type {IProfile} from '../types/auth/profile';

import {createApi} from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '../config/axiosBaseQuery';
import endpoints from '../constants/endpoints';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  // refetchOnMountOrArgChange: true,
  tagTypes: ['StaffProfile', 'CustomerProfile'],
  refetchOnFocus: true,
  endpoints: build => ({
    // GET STAFF PROFILE
    staffProfile: build.query<IProfile, void>({
      query: () => ({
        url: endpoints.getAuthEndPoints().staffProfile,
        method: 'GET',
        providesTags: [{type: 'StaffProfile', id: 'STAFF_PROFILE'}],
      }),
    }),

    // LOGIN WITH STAFF
    loginStaff: build.mutation<ILoginResponse, ILoginStaffParams>({
      query: data => ({
        url: endpoints.getAuthEndPoints().staffLogin,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'StaffProfile', id: 'STAFF_PROFILE'}],
    }),

    // STAFF CHANGE PASSWORD
    changePasswordStaff: build.mutation<{status: boolean}, IChangePassRequest>({
      query: data => ({
        url: endpoints.getAuthEndPoints().changePassword,
        method: 'PUT',
        data,
      }),
    }),

    // STAFF RESET PASSWORD FIRST TIME ENTER SYSTEM
    resetPasswordStaff: build.mutation<{status: boolean}, IResetPassRequest>({
      query: data => ({
        url: endpoints.getAuthEndPoints().resetPassword,
        method: 'PUT',
        data,
      }),
    }),

    // GET STAFF PROFILE
    customerProfile: build.query<IProfile, void>({
      query: () => ({
        url: endpoints.getAuthEndPoints().customerProfile,
        method: 'GET',
        providesTags: [{type: 'CustomerProfile', id: 'CUSTOMER_PROFILE'}],
      }),
    }),

    // VERIFY CUSTOMER
    verifyCustomer: build.mutation<
      IVerifyCustomerResponse,
      IVerifyCustomerParams
    >({
      query: data => ({
        url: endpoints.getAuthEndPoints().customerVerify,
        method: 'POST',
        data,
      }),
    }),

    // LOGIN WITH CUSTOMER
    loginCustomer: build.mutation<ILoginResponse, ILoginCustomerParams>({
      query: data => ({
        url: endpoints.getAuthEndPoints().customerLogin,
        method: 'POST',
        data,
      }),
      invalidatesTags: [{type: 'StaffProfile', id: 'CUSTOMER_PROFILE'}],
    }),

    // UPDATE PROFILE
    updateStaffProfile: build.mutation<IProfile, UpdateProfileParams>({
      query: data => ({
        url: endpoints.getAuthEndPoints().staffProfile,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'StaffProfile', id: 'STAFF_PROFILE'}],
    }),

    // UPDATE PROFILE
    updateCustomerProfile: build.mutation<IProfile, UpdateProfileParams>({
      query: data => ({
        url: endpoints.getAuthEndPoints().customerProfile,
        method: 'PUT',
        data,
      }),
      invalidatesTags: [{type: 'CustomerProfile', id: 'CUSTOMER_PROFILE'}],
    }),

    // ADD DEVICE TOKEN
    addDeviceToken: build.mutation<IDeviceResponse, IDeviceParams>({
      query: data => ({
        url: endpoints.getAuthEndPoints().device,
        method: 'POST',
        data,
      }),
    }),

    // LOGOUT
    logout: build.mutation<{status: boolean}, {deviceToken: string}>({
      query: data => ({
        url: endpoints.getAuthEndPoints().logout,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const {
  useLoginStaffMutation,
  useLoginCustomerMutation,
  useVerifyCustomerMutation,
  useStaffProfileQuery,
  useCustomerProfileQuery,
  useLazyCustomerProfileQuery,
  useChangePasswordStaffMutation,
  useResetPasswordStaffMutation,
  useUpdateStaffProfileMutation,
  useUpdateCustomerProfileMutation,
  useAddDeviceTokenMutation,
  useLogoutMutation,
} = authApi;
