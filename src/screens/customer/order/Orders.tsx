import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {VStack} from 'native-base';
import React, {useState} from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {IOrderParams} from '../../../types/order/order';
import FilterOrder from './FilterOrder';
import ListOrder from './ListOrder';

const Orders = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const [params, setParams] = useState<IOrderParams>({
    pageNumber: 1,
    pageSize: 5,
    // staffId: userInfo?.id,
    // status: ORDER_STATUS.PROCESSING,
    // storeId: userInfo?.store?.id,
    // lockerId: userInfo?.st,
  });

  return (
    <Layout>
      <GestureRecognizer
        onSwipeLeft={() => {
          navigation.navigate('CustomerHome');
        }}>
        <VStack space={4}>
          <FilterOrder setParams={setParams} />
          <ListOrder params={params} setParams={setParams} />
        </VStack>
      </GestureRecognizer>
    </Layout>
  );
};

export default Orders;
