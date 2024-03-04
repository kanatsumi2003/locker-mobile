import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlatList, View} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator';
import CustomSpinner from '../../../components/CustomSpinner';
import Empty from '../../../components/Empty';
import CustomSkeletonItem from '../../../components/skeleton/CustomSkeletonItem';
import OrderItem from '../../../features/order/OrderItem';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {useOrdersQuery} from '../../../services/orderService';
import {selectOrderParams} from '../../../stores/order.store';
import {IOrderItem, IOrderParams} from '../../../types/order/order';

interface Props {
  params: IOrderParams;
  setParams: React.Dispatch<React.SetStateAction<IOrderParams>>;
}

const ListOrder: React.FC<Props> = ({params, setParams}) => {
  const [orders, setOrders] = useState<IOrderItem[]>([]);
  const orderParams = useSelector(selectOrderParams);

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // QUERY
  const {data, isLoading, isFetching, refetch} = useOrdersQuery(params);

  const handleLoadMore = useCallback(() => {
    !isFetching &&
      data?.totalPages &&
      params?.pageNumber < data.totalPages &&
      setParams(prev => ({
        ...prev,
        pageNumber: prev.pageNumber + 1,
      }));
  }, [data, params]);

  useEffect(() => {
    if (data?.items) {
      if (data.pageNumber === 1) {
        setOrders(data?.items ? [...data?.items] : []);
      } else {
        data?.items && setOrders([...orders, ...data?.items]);
      }
    } else {
      setOrders([]);
    }
  }, [data]);

  useEffect(() => {
    setParams({...params, ...orderParams});
  }, [orderParams]);

  const onRefresh = () => {
    refetch();
    setParams({...params, pageNumber: 1});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh();
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return [...new Array(5)]?.map(_ => <CustomSkeletonItem />);
  }

  return (
    <>
      {orders?.length ? (
        <FlatList
          contentContainerStyle={{paddingBottom: 250}}
          minH="full"
          data={orders}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View mb={4}>
              <OrderItem
                {...item}
                handlePress={() =>
                  navigation.navigate('StaffOrderDetail', {id: item?.id})
                }
              />
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={onRefresh}
            />
          }
          ListFooterComponent={
            <>
              {!data && <CustomSpinner visible={!data} />}
              {isFetching && <CustomActivityIndicator />}
            </>
          }
        />
      ) : (
        <>
          <CustomSpinner visible={!data} />
          <Empty text="Không có đơn hàng" />
        </>
      )}
    </>
  );
};

export default ListOrder;
