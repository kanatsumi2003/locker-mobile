import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOCAL_STORAGE_ITEMS} from '../constants/common';

const getAccessToken = async () => {
  const accessToken = await AsyncStorage.getItem(
    LOCAL_STORAGE_ITEMS.ACCESS_TOKEN,
  );

  return accessToken;
};

const getFcmToken = async () => {
  const fcmToken = await AsyncStorage.getItem(LOCAL_STORAGE_ITEMS.FCM_TOKEN);

  return fcmToken;
};

const updateAccessToken = async (token: string) => {
  await AsyncStorage.setItem(LOCAL_STORAGE_ITEMS.ACCESS_TOKEN, token);
};

const setAccessToken = async (token: string) => {
  await AsyncStorage.setItem(LOCAL_STORAGE_ITEMS.ACCESS_TOKEN, token);
};

const getRefreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem(
    LOCAL_STORAGE_ITEMS.REFRESH_TOKEN,
  );

  return refreshToken;
};

const updateRefreshToken = async (token: string) => {
  await AsyncStorage.setItem(LOCAL_STORAGE_ITEMS.REFRESH_TOKEN, token);
};

const setRefreshToken = async (token: string) => {
  await AsyncStorage.setItem(LOCAL_STORAGE_ITEMS.REFRESH_TOKEN, token);
};

const setFcmToken = async (token: string) => {
  await AsyncStorage.setItem(LOCAL_STORAGE_ITEMS.FCM_TOKEN, token);
};

const updateFcmToken = async (token: string) => {
  await AsyncStorage.setItem(LOCAL_STORAGE_ITEMS.FCM_TOKEN, token);
};

const clearToken = async () => {
  await AsyncStorage.removeItem(LOCAL_STORAGE_ITEMS.ACCESS_TOKEN);
  await AsyncStorage.removeItem(LOCAL_STORAGE_ITEMS.REFRESH_TOKEN);
};

const AsyncStorageService = {
  getAccessToken,
  updateAccessToken,
  setAccessToken,
  getRefreshToken,
  updateRefreshToken,
  setRefreshToken,
  clearToken,
  getFcmToken,
  setFcmToken,
  updateFcmToken,
};

export default AsyncStorageService;
