import {HStack, ScrollView, Text, VStack} from 'native-base';
import React, {useEffect} from 'react';
import OrderCard from '../../../features/order/OrderCard';
import {useOrdersQuery} from '../../../services/orderService';

import {ORDER_STATUS} from '../../../types/order/order';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import Empty from '../../../components/Empty';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import CustomSkeletonCard from '../../../components/skeleton/CustomSkeletonCard';

const OrderSection = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {data, isFetching, isLoading, refetch} = useOrdersQuery({
    pageNumber: 1,
    pageSize: 5,
    status: ORDER_STATUS.WAITING,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  if (isFetching || isLoading) return <CustomSkeletonCard />;

  return (
    <VStack space={4}>
      <HStack alignItems="center" justifyContent="space-between">
        <CustomSectionTitle
          text={` Đơn hàng đang chờ xử lý (${data?.totalCount || 0})`}
        />

        <Text
          color="gray.500"
          onPress={() => navigation.navigate('StaffOrders')}>
          Xem tất cả
        </Text>
      </HStack>
      {data?.items?.length ? (
        <>
          {data?.items?.length === 1 ? (
            <OrderCard
              {...data?.items?.[0]}
              key={data?.items?.[0]?.id}
              handlePress={() =>
                navigation.navigate('StaffOrderDetail', {
                  id: data?.items?.[0]?.id,
                })
              }
            />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              alwaysBounceHorizontal={true}
              bounces={true}
              decelerationRate="fast"
              pagingEnabled>
              <HStack space={3}>
                {data?.items?.map(order => (
                  <OrderCard
                    maxW={80}
                    {...order}
                    key={order?.id}
                    handlePress={() =>
                      navigation.navigate('StaffOrderDetail', {id: order?.id})
                    }
                  />
                ))}
              </HStack>
            </ScrollView>
          )}
        </>
      ) : (
        <Empty />
      )}
    </VStack>
  );
};

export default OrderSection;
