import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import AsyncStorageService from '../config/asyncStorageService';

export const useFCMToken = <T extends ParamListBase>(
  navigation: NativeStackNavigationProp<T>,
) => {
  const [deviceToken, setDeviceToken] = useState<string>('');
  const deviceType = Platform.OS === 'android' ? 'Android' : 'Ios';

  const handleGetDeviceToken = async () => {
    try {
      const token = await AsyncStorageService.getFcmToken();

      if (token) {
        setDeviceToken(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetDeviceToken();
    });

    return unsubscribe;
  }, []);

  return [deviceToken, deviceType];
};
