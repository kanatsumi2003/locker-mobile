import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import type {AxiosError, AxiosRequestConfig} from 'axios';

import axiosClient from './axiosClient';

export type BaseQueryError = {status?: number; message: any; code: number};

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      paramsSerializer?: AxiosRequestConfig['paramsSerializer'];
    },
    unknown,
    BaseQueryError
  > =>
  async ({url, method, data, params, paramsSerializer}) => {
    try {
      const result = await axiosClient({
        url,
        method,
        data,
        params,
        paramsSerializer,
      });

      return {data: result.data};
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err?.response?.status,
          message: err.response?.data?.message || err?.message,
          code: err?.response?.data?.errorCode,
        },
      };
    }
  };

export default axiosBaseQuery;
