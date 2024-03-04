import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Center, FlatList, View} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomSpinner from '../../../components/CustomSpinner';
import Empty from '../../../components/Empty';
import {useLockersQuery} from '../../../services/lockerService';
import {
  selectOrderLockerParams,
  selectOrderParams,
  setOrderLockerParams,
  setOrderParams,
} from '../../../stores/order.store';
import {
  ILockerItem,
  ILockerParams,
  LOCKER_STATUS,
} from '../../../types/locker/locker';
import CustomSkeletonCard from '../../../components/skeleton/CustomSkeletonCard';
import LockerItem from '../../../features/locker/LockerItem';
import Layout from '../../../layout/MainScreenLayout/Layout';
import CustomButton from '../../../components/CustomButton';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';

const ListLockerFilter = () => {
  const [params, setParams] = useState<ILockerParams>({
    pageNumber: 1,
    pageSize: 5,
    status: LOCKER_STATUS.ACTIVE,
  });
  const [lockers, setLockers] = useState<ILockerItem[]>([]);

  const orderLockerParams = useSelector(selectOrderLockerParams);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {data, isLoading, isFetching, refetch} = useLockersQuery(params);

  const handleLoadMore = useCallback(() => {
    (!isFetching || !isLoading) &&
      data?.totalPages &&
      params?.pageNumber < data.totalPages &&
      setParams(prev => ({
        ...prev,
        pageNumber: prev.pageNumber + 1,
      }));
  }, [data, params]);

  useEffect(() => {
    if (data?.items) {
      if (params.pageNumber === 1) {
        setLockers([...data?.items]);
      } else {
        data?.items && setLockers([...lockers, ...data?.items]);
      }
    } else {
      setLockers([]);
    }
  }, [data]);

  const onRefresh = () => {
    refetch();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return [...new Array(5)]?.map(_ => <CustomSkeletonCard />);
  }

  const handleSelectLocker = (id: number, name?: string) => {
    if (orderLockerParams?.lockerId === id) {
      dispatch(
        setOrderLockerParams({lockerId: undefined, lockerName: undefined}),
      );
    } else {
      dispatch(setOrderLockerParams({lockerId: id, lockerName: name}));
    }
  };

  return (
    <Layout>
      {lockers?.length ? (
        <FlatList
          contentContainerStyle={{
            paddingBottom: 180,
          }}
          minH="full"
          data={lockers}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View
              mb={4}
              {...(item?.id === orderLockerParams?.lockerId && {
                borderWidth: '1',
                rounded: 'lg',
                borderColor: 'blue.500',
              })}>
              <LockerItem
                {...item}
                handlePress={() => handleSelectLocker(item?.id, item?.name)}
              />
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={onRefresh}
            />
          }
          ListFooterComponent={
            <View>{isFetching && <CustomSpinner visible={isFetching} />}</View>
          }
        />
      ) : (
        <Empty text="Không có lockers" />
      )}
      <Center
        rounded="lg"
        bg="white"
        shadow="1"
        w="full"
        position="sticky"
        bottom="16">
        <CustomButton w="full" onPress={() => navigation.goBack()}>
          Xác nhận
        </CustomButton>
      </Center>
    </Layout>
  );
};

export default ListLockerFilter;
