import type {AxiosResponse} from 'axios';

import axios from 'axios';
import AsyncStorageService from './asyncStorageService';
import endpoints from '../constants/endpoints';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.RN_API_KEY,
  },
});

axiosClient.interceptors.request.use(async (config: any) => {
  const token = await AsyncStorageService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async err => {
    const originalConfig = err.config;
    const refreshTokenUrl = endpoints.getAuthEndPoints().refreshToken;

    if (originalConfig.url !== refreshTokenUrl && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = await AsyncStorageService.getRefreshToken();

          if (refreshToken) {
            const res = await axiosClient.post(refreshTokenUrl, {refreshToken});

            await AsyncStorageService.updateAccessToken(res.data.accessToken);
            await AsyncStorageService.updateRefreshToken(res.data.refreshToken);
          }

          return axiosClient(originalConfig);
        } catch (_error) {
          await AsyncStorageService.clearToken();

          // navigate to login page
          // historyNavigation.navigate(PATH.LOGIN);

          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  },
);
export default axiosClient;
