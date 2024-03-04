import React from 'react';
import {ICreateOrderRequest} from '../../../types/order/order';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import {HStack, Text, VStack} from 'native-base';
import OrderCardConfirm from '../../../features/order/OrderCardConfirm';
import LockerCard from '../../../features/locker/LockerCard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';

interface Props extends ICreateOrderRequest {}

const OrderDetailConfirmSection: React.FC<Partial<Props>> = ({...data}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <VStack space="4">
      <HStack alignItems="center" justifyContent="space-between">
        <CustomSectionTitle text="Đơn hàng" />
        <Text
          color="gray.500"
          onPress={() => navigation.navigate('CustomerSettings')}>
          Thông tin ứng dụng
        </Text>
      </HStack>

      <OrderCardConfirm {...data} />
      <CustomSectionTitle text="Locker" />
      <LockerCard {...data?.locker} />
      <CustomSectionTitle text={`Dịch vụ (${data?.details?.length})`} />
    </VStack>
  );
};

export default OrderDetailConfirmSection;
