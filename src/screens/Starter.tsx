import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import StarterLayout from '../features/starter/StarterLayout';
import {useAuth} from '../hooks/useAuth';
import {RootStackParamList} from '../navigation/StackNavigation';
import {selectUserInfo} from '../stores/global.store';
import {ROLE} from '../types/auth/profile';
import Layout from '../layout/MainScreenLayout/Layout';

const Starter = () => {
  const isAuth = useAuth();
  const userInfo = useSelector(selectUserInfo);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (isAuth) {
      if (userInfo?.role === ROLE.CUSTOMER) {
        navigation.navigate('TabStackCustomer');
      }

      if (userInfo?.role === ROLE.LAUNDRY_ATTENDANT) {
        navigation.navigate('TabStackStaff');
      }
    } else {
      navigation.navigate('VerifyCustomer');
    }
  }, [userInfo, isAuth]);

  return (
    <Layout>
      <LottieView
        source={require('../assets/washing-machine.json')}
        autoPlay
        loop
      />
    </Layout>
  );
};

export default Starter;
