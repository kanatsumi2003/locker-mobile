import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {HomeStackParamList} from '../../navigation/customer/TabNavigationCustomer';
import OptionCard from './OptionCard';

const OptionOrder = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handlePress = () => {
    navigation.navigate('CustomerOrders');
  };

  return (
    <OptionCard
      handlePress={handlePress}
      imagePath={require('../../assets/laundry-order.png')}
      heading="Đơn hàng"
    />
  );
};

export default OptionOrder;
