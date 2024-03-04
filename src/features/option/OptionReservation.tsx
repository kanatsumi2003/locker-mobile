import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {HomeStackParamList} from '../../navigation/customer/TabNavigationCustomer';
import OptionCard from './OptionCard';

const OptionReservation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handlePress = () => {
    navigation.navigate('CustomerLockers');
  };

  return (
    <OptionCard
      handlePress={handlePress}
      imagePath={require('../../assets/reservation.jpg')}
      heading="Đặt chỗ"
    />
  );
};

export default OptionReservation;
