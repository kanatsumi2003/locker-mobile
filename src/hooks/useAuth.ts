import {useEffect, useState} from 'react';
import AsyncStorageService from '../config/asyncStorageService';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const handleGetAccessToken = async () => {
    try {
      const token = await AsyncStorageService.getAccessToken();
      setIsAuth(!!token);
    } catch (error) {
      setIsAuth(false);
    }
  };

  handleGetAccessToken();

  return isAuth;
};
