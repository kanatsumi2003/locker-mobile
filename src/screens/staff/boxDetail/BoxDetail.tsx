import {RouteProp, useRoute} from '@react-navigation/native';
import {VStack} from 'native-base';
import React from 'react';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import Empty from '../../../components/Empty';
import BoxDetailItem from '../../../features/box/BoxDetailItem';
import OrderCard from '../../../features/order/OrderCard';
import ScrollViewLayout from '../../../layout/MainScreenLayout/ScrollViewLayout';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';

const BoxDetail = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffBoxDetail'>>();
  const lastOrder = route.params.lastOrder;

  return (
    <ScrollViewLayout>
      <VStack space={4}>
        <CustomSectionTitle text="Thông tin ô tủ" />
        <BoxDetailItem />
        <CustomSectionTitle text="Đơn hàng gần nhất" />
        {route.params.lastOrder ? (
          <OrderCard
            id={lastOrder?.id}
            pinCode={lastOrder?.pinCode}
            type={lastOrder?.type}
            status={lastOrder?.status}
            sender={lastOrder?.sender}
            receiver={lastOrder?.receiver}
          />
        ) : (
          <Empty text="Không có đơn hàng nào" />
        )}
      </VStack>
    </ScrollViewLayout>
  );
};

export default BoxDetail;
